import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@skillsync/auth";
import { AIService } from "@skillsync/ai";
import { prisma } from "@skillsync/db";
import { successResponse, errorResponse, HttpStatus, validateRequest, logger } from "@skillsync/utils";

// Schema for the incoming analysis request
const AnalyzeSchema = z.object({
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  interests: z.array(z.string()).min(1, "At least one interest is required"),
  education: z.string().min(1, "Education is required"),
  goals: z.string().min(1, "Goals are required"),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user or mock for local testing
    let authUser: { userId: string } | null = null;
    try {
      authUser = await getAuthUser(
        req.cookies.get("accessToken")?.value,
        req.headers.get("authorization")
      );
    } catch (e) {
      // For local testing without login UI, find the user created in /api/users
      const bodyClone = await req.clone().json();
      const tempUser = await prisma.user.findFirst({
        where: { email: bodyClone.email || "test@skillsync.ai" }
      });
      if (!tempUser) throw new Error("Please submit the profile form first to create your user account.");
      authUser = { userId: tempUser.id };
    }

    // 2. Validate payload
    const body = await req.json();
    const profile = validateRequest(AnalyzeSchema, body);

    logger.info({ userId: authUser.userId }, "Starting AI Career Analysis with Gemini...");

    // 3. Make Unified Gemini AI Call
    const aiResult = await AIService.analyzeCareer(profile);
    const { careers, skillGaps, roadmap } = aiResult;

    if (!careers || careers.length === 0) {
      throw new Error("AI failed to generate career recommendations");
    }

    const topCareer = careers[0];

    // 4. Store in Database
    // Using a transaction to ensure everything is saved safely together
    await prisma.$transaction(async (tx) => {
      // First, update the user profile just in case it changed
      await tx.profile.upsert({
        where: { userId: authUser.userId },
        update: {
          education: profile.education,
          goals: profile.goals,
        },
        create: {
          userId: authUser.userId,
          education: profile.education,
          goals: profile.goals,
        }
      });

      // Save top recommendation with its nested skill gaps and roadmap
      await tx.careerRecommendation.create({
        data: {
          userId: authUser.userId,
          domain: aiResult.domain,
          subdomains: aiResult.subdomains || [],
          role: topCareer.role,
          score: topCareer.score,
          reason: topCareer.reason,
          skillGaps: {
            create: skillGaps.map((gap: any) => ({
              skill: gap.skill,
              priority: gap.priority,
              reason: gap.reason
            }))
          },
          roadmap: {
            create: roadmap.map((step: any) => ({
              step: step.step || step.week,
              task: step.task,
              timeline: step.timeline
            }))
          }
        }
      });
    });

    logger.info({ userId: authUser.userId }, "Analysis stored in DB successfully");

    // 7. Return strict structured JSON
    return NextResponse.json(
      successResponse({
        careers,
        skillGaps,
        roadmap
      }, "Analysis completed successfully"),
      { status: HttpStatus.OK }
    );

  } catch (error: any) {
    logger.error({ err: error }, "Failed to run career analysis");
    
    // Check if it's our ApiError
    const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    return NextResponse.json(
      errorResponse(error.message || "Failed to process request", statusCode, error.errors),
      { status: statusCode }
    );
  }
}

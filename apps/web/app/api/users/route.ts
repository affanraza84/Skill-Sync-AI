import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@skillsync/db";
import { successResponse, errorResponse, HttpStatus, validateRequest, logger } from "@skillsync/utils";

const CreateUserSchema = z.object({
  email: z.string().email(),
  education: z.string().optional(),
  goals: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validate request
    const validatedData = validateRequest(CreateUserSchema, body);

    // 2. Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: { profile: true },
    });

    if (user) {
      // If user exists, update their profile
      if (validatedData.education || validatedData.goals) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            profile: {
              upsert: {
                create: {
                  education: validatedData.education,
                  goals: validatedData.goals,
                },
                update: {
                  education: validatedData.education,
                  goals: validatedData.goals,
                }
              }
            }
          },
          include: { profile: true },
        });
      }
      return NextResponse.json(
        successResponse({ user }, "User updated successfully"),
        { status: HttpStatus.OK }
      );
    }

    // 3. Create new user and profile
    logger.info({ email: validatedData.email }, "Creating new user in database...");
    
    user = await prisma.user.create({
      data: {
        email: validatedData.email,
        profile: {
          create: {
            education: validatedData.education,
            goals: validatedData.goals,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    logger.info({ userId: user.id }, "User created successfully");

    return NextResponse.json(
      successResponse({ user }, "User created successfully"),
      { status: HttpStatus.CREATED }
    );
  } catch (error: any) {
    logger.error({ err: error }, "Failed to create user");
    return NextResponse.json(
      errorResponse(
        error.message || "Failed to process request", 
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, 
        error.errors
      ),
      { status: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

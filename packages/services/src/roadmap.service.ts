import { AIService, CareerProfile } from "@skillsync/ai";

export class RoadmapService {
  /**
   * Generates a deterministic, sequential roadmap based on gaps.
   */
  static async generateRoadmap(profile: CareerProfile, targetRole: string, skillGaps: any[]) {
    // If there are no skill gaps, the user is already qualified!
    if (skillGaps.length === 0) {
      return [
        {
          week: 1,
          task: "You are fully equipped for this role! Start applying for jobs and preparing for interviews."
        }
      ];
    }

    const rawRoadmap = await AIService.generateRoadmap(profile, targetRole, skillGaps);

    // Ensure deterministic ordering by week
    return rawRoadmap.sort((a: any, b: any) => a.week - b.week);
  }
}

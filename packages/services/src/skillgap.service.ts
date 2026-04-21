import { AIService, CareerProfile } from "@skillsync/ai";
import { Priority } from "@skillsync/db";

export class SkillGapService {
  /**
   * Detects skill gaps for a target role, formatting and deduplicating them.
   */
  static async analyzeSkillGaps(profile: CareerProfile, targetRole: string) {
    const rawGaps = await AIService.detectSkillGaps(profile, targetRole);

    // Deduplicate and map priority safely
    const uniqueGapsMap = new Map<string, any>();

    rawGaps.forEach((gap: any) => {
      const normalizedSkillName = gap.skill.trim();
      
      let priority: Priority = Priority.MEDIUM;
      if (gap.priority === "HIGH") priority = Priority.HIGH;
      else if (gap.priority === "LOW") priority = Priority.LOW;

      // Only add if not already present to avoid duplicates
      if (!uniqueGapsMap.has(normalizedSkillName.toLowerCase())) {
        uniqueGapsMap.set(normalizedSkillName.toLowerCase(), {
          skill: normalizedSkillName,
          priority,
        });
      }
    });

    return Array.from(uniqueGapsMap.values());
  }
}

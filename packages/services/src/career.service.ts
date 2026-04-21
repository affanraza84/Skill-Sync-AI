import { AIService, CareerProfile } from "@skillsync/ai";

export class CareerService {
  /**
   * Evaluates user profile and returns top matching careers.
   * Includes AI inference and rule-based scoring adjustments.
   */
  static async evaluateCareers(profile: CareerProfile) {
    const rawCareers = await AIService.analyzeCareer(profile);

    // Rule-based normalizations
    const normalizedCareers = rawCareers.map((career: any) => {
      // Ensure score is between 0 and 100
      let finalScore = Math.max(0, Math.min(100, career.score));
      
      // Example rule: If goals match role keywords, boost score
      if (profile.goals && profile.goals.toLowerCase().includes(career.role.toLowerCase())) {
        finalScore = Math.min(100, finalScore + 5);
      }

      return {
        ...career,
        score: finalScore,
      };
    });

    // Sort by score descending
    return normalizedCareers.sort((a: any, b: any) => b.score - a.score);
  }
}

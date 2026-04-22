import { GoogleGenerativeAI } from "@google/generative-ai";

export interface CareerProfile {
  skills: string[];
  interests: string[];
  education: string;
  goals: string;
}

export class AIService {
  private static ROLE_LIBRARY: Record<string, string[]> = {
    tech: [
      "Machine Learning Engineer", "Cloud Solutions Architect", "Frontend Performance Engineer", 
      "DevSecOps Engineer", "Data Pipeline Architect", "Embedded Systems Engineer", 
      "Site Reliability Engineer", "Blockchain Developer", "AI Product Manager"
    ],
    social: [
      "Public Policy Analyst", "Behavioral Researcher", "Community Development Manager", 
      "Urban Sustainability Planner", "Social Impact Strategist", "Human Rights Advocate",
      "Demographic Analyst", "Nonprofit Program Director"
    ],
    commerce: [
      "Quantitative Analyst", "Growth Marketing Strategist", "Supply Chain Optimization Manager", 
      "FinTech Product Manager", "Corporate Strategist", "Market Intelligence Director",
      "E-commerce Operations Manager", "Risk Management Consultant"
    ],
    science: [
      "Bioinformatics Specialist", "Clinical Data Manager", "Materials Research Scientist", 
      "Environmental Consultant", "Epidemiological Data Analyst", "Pharmacovigilance Scientist",
      "Renewable Energy Analyst", "Genomic Researcher"
    ]
  };

  private static detectDomain(profile: CareerProfile): string {
    const profileString = JSON.stringify(profile).toLowerCase();
    
    const domainKeywords = {
      tech: ["software", "code", "programming", "cloud", "developer", "engineering", "ai", "machine learning", "data pipeline", "frontend", "backend", "web"],
      science: ["biology", "chemistry", "physics", "research", "clinical", "laboratory", "genetics", "environment", "materials", "medical", "science"],
      commerce: ["business", "finance", "marketing", "supply chain", "economics", "sales", "accounting", "management", "strategy", "investment", "commerce"],
      social: ["policy", "sociology", "psychology", "community", "public", "human", "education", "behavioral", "nonprofit", "urban", "social"]
    };

    let maxMatches = -1;
    let selectedDomain = "tech"; // default fallback

    for (const [domain, keywords] of Object.entries(domainKeywords)) {
      const matches = keywords.filter(kw => profileString.includes(kw)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        selectedDomain = domain;
      }
    }

    // Default to tech if no strong match, or keep whatever we found
    return maxMatches === 0 ? "tech" : selectedDomain;
  }

  static async analyzeCareer(profile: CareerProfile) {
    const domain = this.detectDomain(profile);
    const candidateRoles = this.ROLE_LIBRARY[domain];

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing. Using fallback mock data.");
      return this.getFallbackData(profile, domain, candidateRoles);
    }

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        TASK: Rank candidate roles based on the user profile and provide domain-specific insights.

        INPUT PROFILE:
        {
          "education": "${profile.education}",
          "skills": ${JSON.stringify(profile.skills)},
          "interests": ${JSON.stringify(profile.interests)},
          "goals": "${profile.goals}"
        }

        CANDIDATE ROLES (DO NOT CREATE NEW ROLES):
        ${JSON.stringify(candidateRoles)}

        --------------------------------------------------
        STEP 1: SELECT AND RANK ROLES
        --------------------------------------------------
        Select the top 3–5 roles from the candidate list that best match the user profile.
        For each role:
        - Assign a score (0-100) based on alignment with skills, interests, and goals.
        - Give a concise reason referencing exact inputs.

        DO NOT CREATE NEW ROLES. ONLY CHOOSE FROM THE PROVIDED LIST.

        --------------------------------------------------
        STEP 2: SKILL GAPS
        --------------------------------------------------
        Generate 4–6 skill gaps specific to the TOP selected role. Must be domain-specific.
        Include a priority (HIGH, MEDIUM, LOW) and a reason.

        --------------------------------------------------
        STEP 3: ROADMAP
        --------------------------------------------------
        Generate a 4–6 step roadmap tailored to the TOP selected role.
        Include actionable tasks and timelines (e.g., "Week 1", "Month 1").

        --------------------------------------------------
        OUTPUT (STRICT JSON ONLY)
        --------------------------------------------------
        {
          "domain": "${domain}",
          "subdomains": ["string"],
          "careers": [
            {
              "role": "string",
              "score": number,
              "reason": "string"
            }
          ],
          "skillGaps": [
            {
              "skill": "string",
              "priority": "HIGH" | "MEDIUM" | "LOW",
              "reason": "string"
            }
          ],
          "roadmap": [
            {
              "step": number,
              "task": "string",
              "timeline": "string"
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanedText = text.replace(/\`\`\`json/gi, "").replace(/\`\`\`/g, "").trim();
      const parsedData = JSON.parse(cleanedText);

      // POST-PROCESSING: Filter out any generic roles just in case
      const genericKeywords = ["software engineer", "data analyst", "developer", "engineer", "analyst"];
      if (parsedData.careers) {
        parsedData.careers = parsedData.careers.filter((c: any) => {
          const roleLower = c.role.toLowerCase();
          // Keep only if it exactly matches one of our candidates, or if it doesn't match a generic keyword
          const isCandidate = candidateRoles.some(cr => cr.toLowerCase() === roleLower);
          if (isCandidate) return true;
          
          const isGeneric = genericKeywords.some(gk => roleLower === gk);
          return !isGeneric;
        });

        // Ensure we always have at least one fallback role if all were filtered
        if (parsedData.careers.length === 0) {
           parsedData.careers = candidateRoles.slice(0, 2).map((role, idx) => ({
            role,
            score: 90 - (idx * 10),
            reason: "Selected as fallback optimal fit."
          }));
        }
      }

      return parsedData;
    } catch (error) {
      console.error("Gemini AI analysis failed:", error);
      return this.getFallbackData(profile, domain, candidateRoles);
    }
  }

  private static getFallbackData(profile: CareerProfile, domain: string, candidateRoles: string[]) {
    // Select top 2 roles from candidateRoles
    const fallbackCareers = candidateRoles.slice(0, 2).map((role, idx) => ({
      role,
      score: 95 - (idx * 10),
      reason: "Matches your profile well based on your background."
    }));

    return {
      domain,
      subdomains: ["General Analytics", "Applied Strategy"],
      careers: fallbackCareers,
      skillGaps: [
        { skill: "Domain Specific Knowledge", priority: "HIGH", reason: "Essential for starting out." },
        { skill: "Advanced Problem Solving", priority: "MEDIUM", reason: "Required for senior responsibilities." }
      ],
      roadmap: [
        { step: 1, task: "Master foundational concepts.", timeline: "Week 1-2" },
        { step: 2, task: "Build a practical project.", timeline: "Week 3-4" }
      ]
    };
  }
}

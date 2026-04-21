import { GoogleGenerativeAI } from "@google/generative-ai";

export interface CareerProfile {
  skills: string[];
  interests: string[];
  education: string;
  goals: string;
}

export class AIService {
  static async analyzeCareer(profile: CareerProfile) {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing. Using fallback mock data.");
      return this.getFallbackData(profile);
    }

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        TASK: Generate highly specific, domain-accurate career recommendations.

        INPUT:
        {
          "education": "${profile.education}",
          "skills": ${JSON.stringify(profile.skills)},
          "interests": ${JSON.stringify(profile.interests)},
          "goals": "${profile.goals}"
        }

        --------------------------------------------------
        STEP 1: DOMAIN & SUBDOMAIN CLASSIFICATION (MANDATORY)
        --------------------------------------------------
        - Infer PRIMARY DOMAIN (e.g., Tech, Social Science, Commerce, Life Sciences).
        - Infer 1–2 SUBDOMAINS from skills/interests (e.g., NLP, Cybersecurity, Behavioral Economics, Public Policy, Supply Chain Analytics, Biostatistics).

        Return internally (do not output):
        - domain
        - subdomains[]

        --------------------------------------------------
        STEP 2: ROLE GENERATION (STRICT)
        --------------------------------------------------
        Generate EXACTLY 4–6 roles with HIGH specificity.

        HARD RULES:
        - DO NOT use generic titles:
          ["Software Engineer", "Data Analyst", "Engineer", "Analyst", "Developer"]
        - Each role MUST include a qualifier:
          - Tech examples:
            "NLP Engineer", "Computer Vision Engineer",
            "Cloud Security Engineer", "Frontend Performance Engineer",
            "MLOps Engineer", "Embedded Systems Engineer"
          - Analytics examples:
            "Product Analytics Specialist", "Growth Data Scientist",
            "Supply Chain Analyst", "Risk Modeling Analyst",
            "Marketing Attribution Analyst"
          - Social Science examples:
            "Policy Research Associate", "Development Economist",
            "Urban Planning Analyst", "Public Affairs Consultant"
          - Commerce examples:
            "Investment Banking Analyst", "Forensic Accountant",
            "FP&A Analyst", "Credit Risk Analyst"

        - Each role MUST map to at least TWO of:
          {skills, interests, goals}

        --------------------------------------------------
        STEP 3: EVIDENCE-BASED SCORING
        --------------------------------------------------
        For each role:
        - score (0–100) based on:
          skill_match (0–40) + interest_match (0–30) + goal_alignment (0–30)

        - Include a SHORT reason referencing EXACT inputs:
          e.g., "Python + NLP interest -> strong fit for NLP Engineer"

        --------------------------------------------------
        STEP 4: SKILL GAPS (NON-GENERIC)
        --------------------------------------------------
        - Provide 4–6 skills gaps SPECIFIC to the TOP 2 roles.
        - Avoid generic skills unless justified.
        - Include reason:
          e.g., "Transformers -> required for NLP Engineer"

        --------------------------------------------------
        STEP 5: ROADMAP (ROLE-SPECIFIC)
        --------------------------------------------------
        - 4–6 steps tailored to TOP role
        - Include tools/technologies
          e.g., "Build a sentiment analysis model using BERT"

        --------------------------------------------------
        OUTPUT (STRICT JSON ONLY)
        --------------------------------------------------
        {
          "domain": "string",
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
              "task": "string"
            }
          ]
        }

        --------------------------------------------------
        FINAL CONSTRAINTS
        --------------------------------------------------
        - No generic roles
        - No repetition
        - Roles must differ meaningfully
        - Must feel personalized to THIS input
        - Return ONLY JSON
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Clean up markdown code blocks if the AI includes them
      const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const parsedData = JSON.parse(cleanedText);

      // POST-PROCESSING: Validation Layer
      const profileString = JSON.stringify(profile);
      const techKeywords = ["computer", "software", "tech", "data", "engineering", "it", "web", "programming", "code", "ai", "machine learning", "developer"];
      const hasTechKeywords = techKeywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(profileString));
      const isNonTech = !hasTechKeywords;
      
      if (isNonTech && parsedData.careers) {
        // Filter out strict tech roles as a fallback safeguard
        const techKeywords = ["software", "developer", "engineer", "data analyst", "full stack", "frontend", "backend"];
        parsedData.careers = parsedData.careers.filter((c: any) => {
          const roleLower = c.role.toLowerCase();
          return !techKeywords.some(tk => roleLower.includes(tk));
        });

        // If filtering removed everything, inject a safe default based on education
        if (parsedData.careers.length === 0) {
          parsedData.careers = [
            { role: "Policy Research Associate", score: 90, reason: "Strong alignment with social science/arts background." },
            { role: "Qualitative Researcher", score: 85, reason: "Leverages your academic and analytical skills." }
          ];
        }
      }

      return parsedData;
    } catch (error) {
      console.error("Gemini AI analysis failed:", error);
      return this.getFallbackData(profile);
    }
  }

  private static getFallbackData(profile?: CareerProfile) {
    const profileString = profile ? JSON.stringify(profile) : "";
    const techKeywords = ["computer", "software", "tech", "data", "engineering", "it", "web", "programming", "code", "ai", "machine learning", "developer"];
    const hasTechKeywords = techKeywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(profileString));
    const isNonTech = profile && !hasTechKeywords;

    if (isNonTech) {
      return {
        domain: "Social Sciences & Humanities",
        subdomains: ["Public Policy", "Behavioral Analysis"],
        careers: [
          { role: "Policy Research Associate", score: 90, reason: "Strong alignment with social science/arts background." },
          { role: "Qualitative Researcher", score: 85, reason: "Leverages your academic and analytical skills." },
          { role: "Public Affairs Consultant", score: 80, reason: "Good fit for organizational and management skills." }
        ],
        skillGaps: [
          { skill: "Data Analysis (SPSS/R)", priority: "HIGH", reason: "Crucial for modern quantitative research." },
          { skill: "Grant Writing", priority: "MEDIUM", reason: "Important for securing funding in non-profits or academia." }
        ],
        roadmap: [
          { step: 1, task: "Review quantitative research methods." },
          { step: 2, task: "Practice policy brief formatting." }
        ]
      };
    }

    return {
      domain: "Technology",
      subdomains: ["Software Engineering", "Data Analytics"],
      careers: [
        { role: "Frontend Performance Engineer", score: 95, reason: "Matches your technical background perfectly." },
        { role: "Product Analytics Specialist", score: 85, reason: "Strong analytical overlap with your skills." }
      ],
      skillGaps: [
        { skill: "System Design", priority: "HIGH", reason: "Essential for technical interviews." },
        { skill: "Advanced SQL", priority: "MEDIUM", reason: "Required for data manipulation tasks." }
      ],
      roadmap: [
        { step: 1, task: "Master foundational algorithms." },
        { step: 2, task: "Build a full-stack side project." }
      ]
    };
  }
}

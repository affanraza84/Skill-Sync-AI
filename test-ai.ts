import { AIService } from "./packages/ai/src/services/ai.service";

async function run() {
  console.log("TESTING SOCIAL DOMAIN");
  const socialRes = await AIService.analyzeCareer({
    skills: ["policy writing", "public speaking", "research"],
    interests: ["sociology", "community"],
    education: "BA Sociology",
    goals: "Improve urban planning"
  });
  console.log(JSON.stringify(socialRes, null, 2));

  console.log("\nTESTING COMMERCE DOMAIN");
  const commerceRes = await AIService.analyzeCareer({
    skills: ["excel", "financial modeling", "sales"],
    interests: ["business", "finance"],
    education: "MBA",
    goals: "Become a CFO"
  });
  console.log(JSON.stringify(commerceRes, null, 2));
}

run().catch(console.error);

import { prisma } from "@skillsync/db";

async function runExample() {
  console.log("Creating user + profile...");
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      profile: {
        create: {
          education: "B.Sc Computer Science",
          goals: "Become a Senior Backend Engineer",
        },
      },
    },
    include: {
      profile: true,
    },
  });
  console.log("User created:", user);

  console.log("Storing skills and interests...");
  const profileId = user.profile!.id;

  // Assume skills and interests already exist from seed
  const jsSkill = await prisma.skill.findUnique({ where: { name: "JavaScript" } });
  const aiInterest = await prisma.interest.findUnique({ where: { name: "AI" } });

  if (jsSkill && aiInterest) {
    const updatedProfile = await prisma.profile.update({
      where: { id: profileId },
      data: {
        skills: {
          connect: { id: jsSkill.id },
        },
        interests: {
          connect: { id: aiInterest.id },
        },
      },
      include: {
        skills: true,
        interests: true,
      },
    });
    console.log("Profile updated with skills and interests:", updatedProfile);
  }

  console.log("Generating career recommendation...");
  const recommendation = await prisma.careerRecommendation.create({
    data: {
      userId: user.id,
      role: "Senior Backend Engineer",
      score: 85.5,
      skillGaps: {
        create: [
          { skill: "Docker & Kubernetes", priority: "HIGH" },
          { skill: "System Design", priority: "MEDIUM" },
        ],
      },
    },
    include: {
      skillGaps: true,
    },
  });
  console.log("Career recommendation stored:", recommendation);

  console.log("Fetching career recommendations for user...");
  const fetchedUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      recommendations: {
        include: {
          skillGaps: true,
        },
      },
    },
  });
  console.dir(fetchedUser, { depth: null });
}

runExample()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

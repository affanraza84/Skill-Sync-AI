-- CreateTable
CREATE TABLE "RoadmapStep" (
    "id" UUID NOT NULL,
    "careerId" UUID NOT NULL,
    "week" INTEGER NOT NULL,
    "task" TEXT NOT NULL,

    CONSTRAINT "RoadmapStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoadmapStep" ADD CONSTRAINT "RoadmapStep_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "CareerRecommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `communityPostGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "communityPostGenre" DROP CONSTRAINT "CommunityPostGenre_genreId_fkey";

-- DropForeignKey
ALTER TABLE "communityPostGenre" DROP CONSTRAINT "CommunityPostGenre_postId_fkey";

-- DropTable
DROP TABLE "communityPostGenre";

-- CreateTable
CREATE TABLE "communityRecruitmentField" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "field" TEXT NOT NULL,

    CONSTRAINT "communityRecruitmentField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostRecruitment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PostRecruitment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PostRecruitment_B_index" ON "_PostRecruitment"("B");

-- AddForeignKey
ALTER TABLE "_PostRecruitment" ADD CONSTRAINT "_PostRecruitment_A_fkey" FOREIGN KEY ("A") REFERENCES "communityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostRecruitment" ADD CONSTRAINT "_PostRecruitment_B_fkey" FOREIGN KEY ("B") REFERENCES "communityRecruitmentField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

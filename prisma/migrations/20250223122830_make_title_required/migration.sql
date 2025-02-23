/*
  Warnings:

  - Made the column `title` on table `novelEpisode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "novelEpisode" ALTER COLUMN "title" SET NOT NULL;

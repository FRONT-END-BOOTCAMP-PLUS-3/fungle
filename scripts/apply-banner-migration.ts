import { prisma } from "../infrastructure/config/prisma";

/**
 * 누락된 컬럼들 추가 마이그레이션 직접 실행
 * - novel.bannerImage
 * - novelEpisode.isFinalEpisode
 */
async function applyMigrations() {
  try {
    console.log("🔧 누락된 컬럼 추가 중...");

    // 1. novel.bannerImage 추가
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "novel" ADD COLUMN IF NOT EXISTS "bannerImage" TEXT;
    `);
    console.log("✅ novel.bannerImage 컬럼 추가 완료!");

    // 2. novelEpisode.isFinalEpisode 추가
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "novelEpisode" ADD COLUMN IF NOT EXISTS "isFinalEpisode" BOOLEAN DEFAULT false;
    `);
    console.log("✅ novelEpisode.isFinalEpisode 컬럼 추가 완료!");

    console.log("\n✅ 모든 마이그레이션 완료!");
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

applyMigrations()
  .then(() => {
    console.log("\n✅ 작업 완료");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 작업 실패:", error);
    process.exit(1);
  });

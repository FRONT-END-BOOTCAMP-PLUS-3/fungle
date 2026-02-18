import { prisma } from "../infrastructure/config/prisma";

/**
 * novelEpisode.isFinalEpisode 컬럼 추가 마이그레이션 직접 실행
 */
async function applyEpisodeMigration() {
  try {
    console.log("🔧 novelEpisode.isFinalEpisode 컬럼 추가 중...");

    await prisma.$executeRawUnsafe(`
      ALTER TABLE "novelEpisode" ADD COLUMN IF NOT EXISTS "isFinalEpisode" BOOLEAN DEFAULT false;
    `);

    console.log("✅ novelEpisode.isFinalEpisode 컬럼 추가 완료!");
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

applyEpisodeMigration()
  .then(() => {
    console.log("\n✅ 작업 완료");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 작업 실패:", error);
    process.exit(1);
  });

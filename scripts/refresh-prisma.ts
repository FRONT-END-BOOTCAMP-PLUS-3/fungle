import { prisma } from "../infrastructure/config/prisma";

/**
 * Prisma 연결 새로고침 및 스키마 동기화 확인
 */
async function refreshPrisma() {
  try {
    console.log("🔄 Prisma 연결 새로고침 중...");

    // 1. 현재 연결 상태 확인
    await prisma.$connect();
    console.log("✅ Prisma 연결 확인");

    // 2. 간단한 쿼리로 DB 연결 테스트
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ DB 연결 테스트 성공:", result);

    // 3. novel 테이블 스키마 확인
    const novelColumns = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'novel' 
      ORDER BY ordinal_position
    `;
    console.log("\n📋 novel 테이블 컬럼 목록:");
    novelColumns.forEach(col => {
      console.log(`  - ${col.column_name}`);
    });

    // 4. novelEpisode 테이블 스키마 확인
    const episodeColumns = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'novelEpisode' 
      ORDER BY ordinal_position
    `;
    console.log("\n📋 novelEpisode 테이블 컬럼 목록:");
    episodeColumns.forEach(col => {
      console.log(`  - ${col.column_name}`);
    });

    console.log("\n✅ Prisma 새로고침 완료!");
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

refreshPrisma()
  .then(() => {
    console.log("\n✅ 작업 완료");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 작업 실패:", error);
    process.exit(1);
  });

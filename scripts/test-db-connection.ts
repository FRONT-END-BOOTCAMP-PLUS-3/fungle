import { prisma } from "../infrastructure/config/prisma";

/**
 * 데이터베이스 연결 테스트 스크립트
 */
async function testConnection() {
  try {
    console.log("🔌 데이터베이스 연결 테스트 시작...\n");

    // 1. 환경 변수 확인
    const dbUrl = process.env.DATABASE_URL;
    const directUrl = process.env.DIRECT_URL;

    if (!dbUrl) {
      console.error("❌ DATABASE_URL이 설정되지 않았습니다.");
      console.log("💡 .env 또는 .env.local 파일에 DATABASE_URL을 설정해주세요.");
      process.exit(1);
    }

    console.log("✅ DATABASE_URL 설정 확인됨");
    console.log(`   URL: ${dbUrl.substring(0, 30)}...`);
    if (directUrl) {
      console.log("✅ DIRECT_URL 설정 확인됨");
    }

    // 2. Prisma 연결 시도
    console.log("\n🔄 Prisma 연결 시도 중...");
    await prisma.$connect();
    console.log("✅ Prisma 연결 성공!");

    // 3. 간단한 쿼리 테스트
    console.log("\n🔄 데이터베이스 쿼리 테스트 중...");
    const result = await prisma.$queryRaw`SELECT 1 as test, NOW() as current_time`;
    console.log("✅ 쿼리 테스트 성공:", result);

    // 4. 테이블 존재 확인
    console.log("\n🔄 주요 테이블 존재 확인 중...");
    const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    console.log(`✅ 발견된 테이블 수: ${tables.length}`);
    if (tables.length > 0) {
      console.log("\n📋 테이블 목록:");
      tables.slice(0, 10).forEach((table) => {
        console.log(`   - ${table.table_name}`);
      });
      if (tables.length > 10) {
        console.log(`   ... 외 ${tables.length - 10}개`);
      }
    }

    console.log("\n✅ 데이터베이스 연결 테스트 완료!");
  } catch (error: unknown) {
    console.error("\n❌ 데이터베이스 연결 실패!");
    if (error instanceof Error) {
      console.error(`   오류 메시지: ${error.message}`);
      console.error(`   오류 코드: ${(error as any).code || "N/A"}`);
      
      if (error.message.includes("ENOENT") || error.message.includes("spawn")) {
        console.error("\n💡 Windows 환경 오류 감지:");
        console.error("   이 오류는 Prisma가 내부적으로 쉘을 실행하려고 할 때 발생할 수 있습니다.");
        console.error("   해결 방법:");
        console.error("   1. 개발 서버를 재시작해보세요: npm run dev");
        console.error("   2. Prisma 클라이언트를 재생성: npx prisma generate");
        console.error("   3. Node.js를 최신 버전으로 업데이트");
      } else if (error.message.includes("P1001") || error.message.includes("connect")) {
        console.error("\n💡 연결 오류:");
        console.error("   1. DATABASE_URL이 올바른지 확인하세요");
        console.error("   2. Supabase 데이터베이스가 활성화되어 있는지 확인하세요");
        console.error("   3. 방화벽이나 네트워크 설정을 확인하세요");
      }
    } else {
      console.error("   알 수 없는 오류:", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("\n🔌 Prisma 연결 종료");
  }
}

testConnection()
  .then(() => {
    console.log("\n✅ 작업 완료");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 작업 실패:", error);
    process.exit(1);
  });

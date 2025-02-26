const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function terminateConnections() {
  try {
    // 현재 Prisma 프로세스의 PID 가져오기
    const result = await prisma.$queryRaw`SELECT pg_backend_pid() AS pid`;
    const currentPid = result[0].pid;

    console.log(`🛑 현재 Prisma 연결 PID: ${currentPid}`);

    // 현재 프로세스를 제외하고 모든 연결 종료
    await prisma.$executeRawUnsafe(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'active' AND pid <> ${currentPid};`
    );

    console.log("🛑 불필요한 PostgreSQL 연결이 종료되었습니다.");
  } catch (error) {
    console.error("❌ 연결 종료 중 오류 발생:", error);
  } finally {
    await prisma.$disconnect();
  }
}

terminateConnections();

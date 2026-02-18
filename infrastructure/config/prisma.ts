import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Windows 환경에서 발생할 수 있는 오류 방지를 위한 설정
const prismaOptions: ConstructorParameters<typeof PrismaClient>[0] = {
  log: process.env.NODE_ENV === "development" 
    ? ['query', 'info', 'warn', 'error'] 
    : ['warn', 'error'],
};

// 데이터베이스 URL 확인
if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL이 설정되지 않았습니다. .env 또는 .env.local 파일을 확인하세요.");
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 서버 종료 시 Prisma 연결 닫기 (Windows 호환)
const disconnectPrisma = async () => {
  try {
    await prisma.$disconnect();
    console.log("🔌 Prisma 연결이 닫혔습니다.");
  } catch (error) {
    console.error("❌ Prisma 연결 종료 중 오류:", error);
  }
};

// SIGTERM은 Windows에서 지원되지 않을 수 있음
if (process.platform !== "win32") {
  process.on("SIGTERM", disconnectPrisma);
}

process.on("SIGINT", disconnectPrisma);

// Windows에서도 작동하는 종료 처리
if (process.platform === "win32") {
  process.on("exit", disconnectPrisma);
}

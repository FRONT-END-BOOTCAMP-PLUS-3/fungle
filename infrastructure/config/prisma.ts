import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], 
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 서버 종료 시 Prisma 연결 닫기
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  console.log("🔌 Prisma 연결이 닫혔습니다. (SIGTERM)");
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("🔌 Prisma 연결이 닫혔습니다. (SIGINT)");
});

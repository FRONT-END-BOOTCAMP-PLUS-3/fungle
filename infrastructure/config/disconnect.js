import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function disconnectPrisma() {
  await prisma.$disconnect();
  console.log("🔌 Prisma 연결이 닫혔습니다.");
}

disconnectPrisma();

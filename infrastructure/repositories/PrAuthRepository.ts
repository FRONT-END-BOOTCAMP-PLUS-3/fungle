import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { PrismaClient, user } from "@prisma/client";

const prisma = new PrismaClient();
export class PrAuthRepository implements AuthRepository {
  async findByEmail(email: string): Promise<user | null> {
    return prisma.user.findUnique({ where: { userEmail: email } }); // userEmail이 아니라 email로 변경
  }

  async findByNickname(nickname: string): Promise<user | null> {
    return prisma.user.findUnique({ where: { nickname } });
  }

  async createUser(user: user): Promise<void> {
    await prisma.user.create({ data: user });
  }
}

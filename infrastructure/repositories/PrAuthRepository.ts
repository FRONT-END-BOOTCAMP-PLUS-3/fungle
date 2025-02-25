import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { prisma } from "../config/prisma";
import { user } from "@prisma/client";

export class PrAuthRepository implements AuthRepository {
  async findByEmail(email: string): Promise<user | null> {
    return await prisma.user.findUnique({
      where: { userEmail: email },
    });
  }

  async findByNickname(nickname: string): Promise<user | null> {
    return prisma.user.findUnique({ where: { nickname } });
  }

  async createUser(user: user): Promise<void> {
    await prisma.user.create({ data: user });
  }
}

import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export class PrAuthRepository implements AuthRepository {
  async findByEmail(email: string): Promise<Prisma.userGetPayload<{
    select: {
      id: true;
      nickname: true;
      userEmail: true;
      password: true;
      createdAt: true;
      type: true;
    };
  }> | null> {
    return await prisma.user.findUnique({
      where: { userEmail: email },
      select: {
        id: true,
        nickname: true,
        userEmail: true,
        password: true,
        createdAt: true,
        type: true,
      },
    });
  }
}

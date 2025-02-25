import { SignUpRequestDTO } from "@/application/usecases/auth/dto/SignupRequestDto";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";
import { AuthRepository } from "@/domain/repositories/AuthRepository";

export class PrAuthRepository implements AuthRepository {
  // Create User (SignUpRequestDTO 적용)
  async createUser(user: SignUpRequestDTO): Promise<void> {
    await prisma.user.create({
      data: {
        nickname: user.nickname,
        userEmail: user.userEmail,
        password: user.password,
        introduce: "",
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { userEmail: email },
    });
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { nickname } });
  }

  // Get all users (password 제외)
  async findAll(): Promise<Omit<User, "password">[] | null> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userEmail: true,
        nickname: true,
        createdAt: true,
        type: true,
        introduce: true,
      },
    });

    return users.length ? users : null;
  }
}

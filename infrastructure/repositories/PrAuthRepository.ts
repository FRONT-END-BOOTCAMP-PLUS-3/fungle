import { SignUpRequestDTO } from "@/application/usecases/auth/dto/SignupRequestDto";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";
import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth/jwt";

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
        profileImage: true,
      },
    });

    return users.length ? users : null;
  }

  async generateTokens(
    userId: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    await prisma.refreshToken.upsert({
      where: { userId },
      update: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return { accessToken, refreshToken };
  }
}

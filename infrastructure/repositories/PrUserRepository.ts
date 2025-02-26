import { SignUpRequestDTO } from "@/application/usecases/auth/dto/SignupRequestDto";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class PrUserRepository implements UserRepository {
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

  async getUserById(userId: string): Promise<Omit<User, "password" | "userEmail" | "createdAt" | "type"> | null> { 
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nickname: true,
        introduce: true,
        profileImage: true
      },
    });
  }
}

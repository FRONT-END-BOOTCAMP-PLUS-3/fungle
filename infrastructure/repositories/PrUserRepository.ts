import { SignUpRequestDTO } from "@/application/usecases/auth/dto/SignupRequestDto";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class PrUserRepository implements UserRepository {
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

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { userEmail: email },
    });
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { nickname } });
  }

  async isNicknameTaken(nickname: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { nickname } });
    return user !== null;
  }

  async findAll(): Promise<Omit<User, "password">[] | null> {
    try {
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
    } catch {
      return null;
    }
  }

  async getUserById(
    userId: string
  ): Promise<Omit<User, "password" | "userEmail" | "createdAt"> | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nickname: true,
        introduce: true,
        profileImage: true,
        type: true,
      },
    });
  }

  async updateNickname(userId: string, newNickname: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { nickname: newNickname },
    });
  }

  async updateIntroduce(userId: string, introduce: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { introduce },
    });
  }

  async updateProfileImage(data: {
    userId: string;
    profileImage: string;
  }): Promise<void> {
    await prisma.user.update({
      where: { id: data.userId },
      data: { profileImage: data.profileImage },
    });
  }

  async findUserIdsByNickname(nickname: string): Promise<{ id: string }[]> {
    return await prisma.user.findMany({
      where: { nickname: { contains: nickname, mode: "insensitive" } },
      select: { id: true },
    });
  }
}

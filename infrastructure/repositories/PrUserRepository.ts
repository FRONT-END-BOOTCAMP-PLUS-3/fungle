import { SignUpRequestDTO } from "@/application/usecases/auth/dto/SignupRequestDto";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class PrUserRepository implements UserRepository {
  // ✅ 사용자 생성 (회원가입)
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

  // ✅ 이메일을 통해 사용자 찾기
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { userEmail: email },
    });
  }

  // ✅ 닉네임을 통해 사용자 찾기
  async findByNickname(nickname: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { nickname } });
  }

  // ✅ 닉네임 중복 검사 추가
  async isNicknameTaken(nickname: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { nickname } });
    return user !== null; // 사용 중이면 `true` 반환
  }

  // ✅ 전체 사용자 조회 (비밀번호 제외)
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

  async getUserById(
    userId: string
  ): Promise<Omit<
    User,
    "password" | "userEmail" | "createdAt" | "type"
  > | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nickname: true,
        introduce: true,
        profileImage: true,
      },
    });
  }

  async updateNickname(userId: string, newNickname: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { nickname: newNickname },
    });
  }
}

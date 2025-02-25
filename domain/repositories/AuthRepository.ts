import { Prisma } from "@prisma/client";

export interface AuthRepository {
  findByEmail(email: string): Promise<Prisma.userGetPayload<{
    select: {
      id: true;
      nickname: true;
      userEmail: true;
      password: true;
      createdAt: true;
      type: true;
    };
  }> | null>; // 가입된 사용자가 없는 경우 null 반환
}

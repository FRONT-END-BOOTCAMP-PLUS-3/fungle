import { INicknameValidationRepository } from "@/application/usecases/auth/interfaces/INicknameValidationUsecaseDto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrNicknameValidationRepository
  implements INicknameValidationRepository
{
  async isNicknameTaken(nickname: string): Promise<boolean> {
    const existingUser = await prisma.user.findUnique({
      where: { nickname },
    });

    return existingUser !== null;
  }
}

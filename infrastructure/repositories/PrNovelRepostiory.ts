import { PrismaClient } from "@prisma/client";
import { Novel } from "@/domain/entities/novel";
import { NovelRepository } from "@/domain/repositories/NovelRepository";

const prisma = new PrismaClient();

export class PrNovelRepository implements NovelRepository {
  async getNovelById(novelId: number): Promise<Novel | null> {
    const novel = await prisma.novel.findUnique({
      where: { id: novelId },
      include: {
        user: { select: { nickname: true, introduce: true } } 
      },
    });

    return novel ? Novel.fromPrisma(novel) : null;
  }
}




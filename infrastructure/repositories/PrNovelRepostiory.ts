import { prisma } from "@/infrastructure/config/prisma";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { Novel } from "@prisma/client";

export class PrNovelRepository implements NovelRepository {
  async getNovelById(novelId: number): Promise<Novel | null> {
    return await prisma.novel.findUnique({
      where: { id: novelId },
    });
  }
}

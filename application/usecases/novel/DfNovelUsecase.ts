import { NovelDto } from "@/application/usecases/novel/dto/Novel";
import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";

export class DfNovelUseCase {
  constructor(private novelRepository: PrNovelRepository) {}

  async execute(novelId: number): Promise<NovelDto | null> {
    const novel = await this.novelRepository.getNovelById(novelId);
    if (!novel) return null;

    return {
      id: novel.id,
      title: novel.title,
      image: novel.image,
      serialDay: novel.serialDay,
      novelIntroduce: novel.novelIntroduce,
      serialStatus: novel.serialStatus,
      author: novel.author
    };
  }
}

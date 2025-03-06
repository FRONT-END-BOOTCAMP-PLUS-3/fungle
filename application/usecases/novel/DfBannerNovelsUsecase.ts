import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { BannerDto } from "@/application/usecases/novel/dto/Banner";

export class DfBannerNovelsUsecase {
  constructor(private novelRepository: NovelRepository) {}

  async execute(): Promise<BannerDto[]> {
    const novels = await this.novelRepository.getNovelsWithBanners();
    
    return novels.map((novel) => ({
      id: novel.id,
      title: novel.title,
      bannerImage: novel.bannerImage,
    }));
  }
}

import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { novelDi } from "@/infrastructure/config/novelDi";
import { FileService } from "@/infrastructure/services/FileService";

export class DfDeleteNovelByNovelIdUsecase {
  constructor(
    private novelRepository: NovelRepository,
    private fileService: FileService
  ) {}

  async execute(novelId: number) {
    try {
      const novel = await novelDi.getNovelByIdUseCase.execute(novelId);
      if (!novel) {
        return { success: false, message: "삭제할 소설이 존재하지 않습니다." };
      }

      if (novel.image) {
        await FileService.deleteCoverImage(novel.image);
      }

      const deleted = await this.novelRepository.deleteNovelById(novelId);
      if (!deleted) {
        return { success: false, message: "소설 삭제에 실패했습니다." };
      }

      return { success: true, message: "소설이 성공적으로 삭제되었습니다." };
    } catch (error) {
      return { success: false, message: "소설 삭제 중 오류가 발생했습니다." };
    }
  }
}

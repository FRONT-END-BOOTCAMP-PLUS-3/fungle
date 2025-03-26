import { UserRepository } from "@/domain/repositories/UserRepository";
import { FileService } from "@/infrastructure/services/FileService";
import { DfGetNovelByUserIdUsecase } from "../novel/DfGetNovelByUserIdUsecase";
import { NovelsByUserIdDto } from "../novel/dto/NovelsByUserId";
import { DfGetFundingByUserIdUsecase } from "../funding/DfGetFundingByNovelIdUsecase";

export class DfDeleteUserByUserIdUsecase {
  constructor(
    private userRepository: UserRepository,
    private readonly novelByUserIdUsecase: DfGetNovelByUserIdUsecase,
    private fileService: FileService,
    private readonly getFundingByUserIdUsecase: DfGetFundingByUserIdUsecase
  ) {}

  async execute(userId: string): Promise<boolean> {
    const novels: NovelsByUserIdDto[] =
      (await this.novelByUserIdUsecase.execute(userId)) || [];

    const fundingResults = await Promise.all(
      novels.map((novel) => this.getFundingByUserIdUsecase.execute(novel.id))
    );

    for (let i = 0; i < novels.length; i++) {
      if (fundingResults[i]?.hasActiveFunding) {
        return false;
      }
    }

    await Promise.all(
      novels.map(
        (novel) => novel.image && FileService.deleteCoverImage(novel.image)
      )
    );

    await FileService.deleteExistingProfileImage(userId);

    await this.userRepository.deleteUser(userId);

    return true;
  }
}

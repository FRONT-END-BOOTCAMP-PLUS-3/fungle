import { UserRepository } from "@/domain/repositories/UserRepository";
import { FileService } from "@/infrastructure/services/FileService";
import path from "path";
import { DfNovelByUserIdUsecase } from "../novel/DfNovelByUserIdUsecase";
import { NovelsByUserIdDto } from "../novel/dto/NovelsByUserId";
import { DfFundingUsecase } from "../funding/DfFundingUsecase";

export class DfDeleteUserUsecase {
  constructor(
    private userRepository: UserRepository,
    private readonly novelByUserIdUsecase: DfNovelByUserIdUsecase,
    private fileService: FileService,
    private readonly fundingUsecase: DfFundingUsecase
  ) {}

  async execute(userId: string): Promise<boolean> {
    const novels: NovelsByUserIdDto[] =
      (await this.novelByUserIdUsecase.execute(userId)) || [];

    const fundingResults = await Promise.all(
      novels.map((novel) => this.fundingUsecase.execute(novel.id))
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

    const profileImageDir = path.join(process.cwd(), "public", "profileImage");
    await FileService.deleteExistingProfileImage(userId, profileImageDir);

    await this.userRepository.deleteUser(userId);

    return true;
  }
}

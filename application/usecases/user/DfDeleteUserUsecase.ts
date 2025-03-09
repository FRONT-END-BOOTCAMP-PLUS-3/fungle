import { UserRepository } from "@/domain/repositories/UserRepository";
import { FileService } from "@/infrastructure/services/FileService";
import path from "path";
import { DfNovelByUserIdUsecase } from "../novel/DfNovelByUserIdUsecase";
import { NovelsByUserIdDto } from "../novel/dto/NovelsByUserId";

export class DfDeleteUserUsecase {
  constructor(
    private userRepository: UserRepository,
    private readonly novelByUserIdUsecase: DfNovelByUserIdUsecase,
    private fileService: FileService
  ) {}

  async execute(userId: string) {
    const novels: NovelsByUserIdDto[] =
      (await this.novelByUserIdUsecase.execute(userId)) || [];

    if (novels.length > 0) {
      novels.forEach(async (novel) => {
        if (novel.image) await FileService.deleteCoverImage(novel.image);
      });
    }

    const profileImageDir = path.join(process.cwd(), "public", "profileImage");
    await FileService.deleteExistingProfileImage(userId, profileImageDir);

    await this.userRepository.deleteUser(userId);
  }
}

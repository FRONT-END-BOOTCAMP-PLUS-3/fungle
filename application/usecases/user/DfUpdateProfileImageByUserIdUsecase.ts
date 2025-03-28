import { UserRepository } from "@/domain/repositories/UserRepository";
import { UpdateProfileImageDto } from "./dto/UpdateProfileImage";
import { FileService } from "@/infrastructure/services/FileService";

export class DfUpdateProfileImageByUserId {
  constructor(
    private userRepository: UserRepository,
    private fileService: FileService
  ) {}

  async execute(data: UpdateProfileImageDto) {
    let profileImageUrl = null;
    if (data.profileImage) {
      profileImageUrl = await FileService.saveProfileImage(
        data.userId,
        data.profileImage
      );
    }

    await this.userRepository.updateProfileImage({
      userId: data.userId,
      profileImage: profileImageUrl,
    });
  }
}

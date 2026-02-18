import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SerialDayNovelDto } from "./dto/SerialDayNovel";


export class DfNovelsBySerialDayUsecase {
  constructor(
    private novelRepository: NovelRepository,
    private userRepository: UserRepository
  ) {}

  async execute(serialDay: string): Promise<SerialDayNovelDto[]> {
    const novels = await this.novelRepository.getNovelsBySerialDay(serialDay) ?? [];

    return await Promise.all(
      novels.map(async (novel) => {
        const user = await this.userRepository.getUserById(novel.userId);
        if (!user) {
          throw new Error(`유저 정보를 찾을 수 없습니다.`);
        }

        return {
          id: novel.id,
          title: novel.title,
          image: novel.image,
          author: user.nickname, 
          fundingStatus: "1단계 ⭐", 
        };
      })
    );
  }
}

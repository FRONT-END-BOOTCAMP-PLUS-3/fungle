import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SerialDayNovelDto } from "./dto/SerialDayNovel";


export class DfNovelsBySerialDayUsecase {
  constructor(
    private novelRepository: NovelRepository,
    private userRepository: UserRepository
  ) {}

  async execute(serialDay: string): Promise<SerialDayNovelDto[]> {
    try {
      const novels = await this.novelRepository.getNovelsBySerialDay(serialDay) ?? [];

      const results = await Promise.all(
        novels.map(async (novel) => {
          try {
            const user = await this.userRepository.getUserById(novel.userId);
            if (!user) {
              console.warn(`소설 ID ${novel.id}의 유저 정보를 찾을 수 없습니다.`);
              return null;
            }

            return {
              id: novel.id,
              title: novel.title,
              image: novel.image,
              author: user.nickname, 
              fundingStatus: "1단계 ⭐", 
            };
          } catch (error) {
            console.error(`소설 ID ${novel.id} 처리 오류:`, error);
            return null;
          }
        })
      );

      return results.filter((result): result is SerialDayNovelDto => result !== null);
    } catch (error) {
      console.error("요일별 소설 목록 조회 오류:", error);
      return [];
    }
  }
}

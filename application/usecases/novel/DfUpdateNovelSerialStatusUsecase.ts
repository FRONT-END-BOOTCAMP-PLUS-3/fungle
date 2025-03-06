import { SERIAL_STATUS } from "@/constants/STATUS";
import { NovelRepository } from "@/domain/repositories/NovelRepository";

export class DfUpdateNovelSerialStatusUsecase {
  constructor(private novelRepository: NovelRepository) {}

  async execute(novelId: number, status: string) {
    const validStatuses = SERIAL_STATUS.map((s) => s.value);
    if (!validStatuses.includes(status)) {
      return { success: false, message: "유효하지 않은 연재 상태입니다." };
    }

    const updated = await this.novelRepository.updateNovelSerialStatus(
      novelId,
      status
    );
    if (!updated) {
      return { success: false, message: "소설 상태 변경에 실패했습니다." };
    }

    return { success: true, message: "소설 상태가 변경되었습니다." };
  }
}

import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { FindAllUserDto } from "./dto/FindAllUser";

export class DfFindAllUserWithFundingStatus {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fundingRepository: FundingRepository
  ) {}

  async execute(): Promise<FindAllUserDto[] | null> {
    const users = await this.userRepository.findAll();
    if (!users) return null;

    const ongoingFundingUserIds =
      await this.fundingRepository.getFundingStatus();

    const usersWithFundingStatus = users.map((user) => ({
      ...user,
      fundingStatus: ongoingFundingUserIds.includes(user.id),
    }));

    return usersWithFundingStatus;
  }
}

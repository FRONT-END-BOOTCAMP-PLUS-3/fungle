import { DfFindAllUserWithFundingStatus } from "@/application/usecases/user/DfFindAllUserWithFundingStatus";
import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrFundingRepository } from "@/infrastructure/repositories/PrFundingRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userRepository: UserRepository = new PrUserRepository();
    const fundingRepository: FundingRepository = new PrFundingRepository();
    const findAllUserWithFundingStatusUsecase =
      new DfFindAllUserWithFundingStatus(userRepository, fundingRepository);

    const users = await findAllUserWithFundingStatusUsecase.execute();

    if (users) {
      return NextResponse.json({ users }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "사용자가 존재하지 않습니다." },
        { status: 404 }
      );
    }
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "서버 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
};

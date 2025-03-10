import { DfVerifyAccessTokenUsecase } from "@/application/usecases/auth/DfVerifyAccessTokenUsecase";
import { PrUserRepository } from "../repositories/PrUserRepository";
import { DfGetUserIdUsecase } from "@/application/usecases/auth/DfGetUserIdUsecase";
import { DfDeleteUserUsecase } from "@/application/usecases/user/DfDeleteUserUsecase";
import { FileService } from "../services/FileService";
import { DfFundingUsecase } from "@/application/usecases/funding/DfFundingUsecase";
import { PrFundingRepository } from "../repositories/PrFundingRepository";
import { DfNovelByUserIdUsecase } from "@/application/usecases/novel/DfNovelByUserIdUsecase";
import { PrNovelRepository } from "../repositories/PrNovelRepostiory";
import { DfEpisodeByUserIdUsecase } from "@/application/usecases/novel/DfEpisodeByUserIdUsecase";
import { PrNovelEpisodeRepository } from "../repositories/PrNovelEpisodeRepository";

export const userDi = {
  userRepository: new PrUserRepository(),
  verifyTokenUsecase: new DfVerifyAccessTokenUsecase(new PrUserRepository()),
  getUserIdUsecase: new DfGetUserIdUsecase(
    new PrUserRepository(),
    new DfVerifyAccessTokenUsecase(new PrUserRepository())
  ),
  deleteUserUsecase: new DfDeleteUserUsecase(
    new PrUserRepository(),
    new DfNovelByUserIdUsecase(
      new PrNovelRepository(),
      new DfEpisodeByUserIdUsecase(new PrNovelEpisodeRepository())
    ),
    new FileService(),
    new DfFundingUsecase(new PrFundingRepository())
  ),
};

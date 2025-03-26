import { DfFindAllUserWithFundingStatus } from "@/application/usecases/user/DfFindAllUserWithFundingStatus";
import { PrUserRepository } from "../repositories/PrUserRepository";
import { PrFundingRepository } from "../repositories/PrFundingRepository";
import { DfDeleteUserByUserIdUsecase } from "@/application/usecases/user/DfDeleteUserByUserIdUsecase";
import { DfGetNovelByUserIdUsecase } from "@/application/usecases/novel/DfGetNovelByUserIdUsecase";
import { FileService } from "../services/FileService";
import { DfGetFundingByUserIdUsecase } from "@/application/usecases/funding/DfGetFundingByNovelIdUsecase";
import { PrNovelEpisodeRepository } from "../repositories/PrNovelEpisodeRepository";
import { PrNovelRepository } from "../repositories/PrNovelRepostiory";
import { DfEpisodeByUserIdUsecase } from "@/application/usecases/novel/DfEpisodeByUserIdUsecase";
import { DfNovelEpisodeWithUserInfoUsecase } from "@/application/usecases/novel/DfNovelEpisodeWithUserInfoUsecase";
import { DfDeleteNovelEpisodeByEpisodeIdUsecase } from "@/application/usecases/novel/DfDeleteNovelEpisodeByEpisodeIdUsecase";
import { DfUpdateNovelEpisodeStatusByEpisodeIdUsecase } from "@/application/usecases/novel/DfUpdateNovelEpisodeStatusByEpisodeIdUsecase";
import { DfFindAllFundingWithNovelUsecase } from "@/application/usecases/funding/DfFindAllFundingWithNovelUsecase";
import { PrFundingStageRepository } from "../repositories/PrFundingStageRepository";
import { DfDeleteFundingByIdUsecase } from "@/application/usecases/funding/DfDeleteFundingByIdUsecase";
import { DfActiveFundingStageById } from "@/application/usecases/funding/DfUpdateFundingStatusByIdUsecase";

export const adminDi = {
  findAllUserWithFundingStatusUsecase: new DfFindAllUserWithFundingStatus(
    new PrUserRepository(),
    new PrFundingRepository()
  ),
  deleteUserByUserIdUsecase: new DfDeleteUserByUserIdUsecase(
    new PrUserRepository(),
    new DfGetNovelByUserIdUsecase(
      new PrNovelRepository(),
      new DfEpisodeByUserIdUsecase(new PrNovelEpisodeRepository())
    ),
    new FileService(),
    new DfGetFundingByUserIdUsecase(new PrFundingRepository())
  ),
  deleteNovelEpisodeByEpisodeIdUsecase:
    new DfDeleteNovelEpisodeByEpisodeIdUsecase(new PrNovelEpisodeRepository()),
  updateNovelEpisodesStatusByEpisodeIdUsecase:
    new DfUpdateNovelEpisodeStatusByEpisodeIdUsecase(
      new PrNovelEpisodeRepository()
    ),
  novelEpisodeWithUserInfoUsecase: new DfNovelEpisodeWithUserInfoUsecase(
    new PrNovelEpisodeRepository()
  ),
  findAllFundingWithNovelUsecase: new DfFindAllFundingWithNovelUsecase(
    new PrNovelRepository(),
    new PrFundingRepository(),
    new PrFundingStageRepository(),
    new PrUserRepository()
  ),
  deleteFundingByIdUsecase: new DfDeleteFundingByIdUsecase(
    new PrFundingStageRepository()
  ),
  activeFundingStageByIdUsecase: new DfActiveFundingStageById(
    new PrFundingStageRepository()
  ),
};

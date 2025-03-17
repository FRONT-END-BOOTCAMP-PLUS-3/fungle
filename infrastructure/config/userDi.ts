import { DfVerifyAccessTokenUsecase } from "@/application/usecases/auth/DfVerifyAccessTokenUsecase";
import { PrUserRepository } from "../repositories/PrUserRepository";
import { DfGetUserIdUsecase } from "@/application/usecases/auth/DfGetUserIdUsecase";
import { DfDeleteUserByUserIdUsecase } from "@/application/usecases/user/DfDeleteUserByUserIdUsecase";
import { FileService } from "../services/FileService";
import { DfGetFundingByUserIdUsecase } from "@/application/usecases/funding/DfGetFundingByNovelIdUsecase";
import { PrFundingRepository } from "../repositories/PrFundingRepository";
import { DfGetNovelByUserIdUsecase } from "@/application/usecases/novel/DfGetNovelByUserIdUsecase";
import { PrNovelRepository } from "../repositories/PrNovelRepostiory";
import { DfEpisodeByUserIdUsecase } from "@/application/usecases/novel/DfEpisodeByUserIdUsecase";
import { PrNovelEpisodeRepository } from "../repositories/PrNovelEpisodeRepository";
import { DfPasswordVerificationUsecase } from "@/application/usecases/auth/DfPasswordVerificationUsecase";
import { PrAuthRepository } from "../repositories/PrAuthRepository";
import { DfLogoutUsecase } from "@/application/usecases/auth/DfLogoutUsecase";
import { DfLoginUsecase } from "@/application/usecases/auth/DfLoginUsecase";
import { DfPostDetailByUserIdUsecase } from "@/application/usecases/community/DfPostDetailByUserIdUsecase";
import { PrCommunityPostRepository } from "../repositories/PrCommunityPostRepository";
import { DfPostStatusUpdateUsecase } from "@/application/usecases/community/DfPostStatusUpdateUsecase";
import { DfLikedCommunityPostsUsecase } from "@/application/usecases/community/DfLikedCommunityPostsUsecase";
import { PrCommunityPostLikeRepository } from "../repositories/PrCommunityPostLikeRepository";
import { DfUpdateIntroduceByUserIdUsecase } from "@/application/usecases/user/DfUpdateIntroduceByUserIdUsecase";
import { DfUpdateNicknameByUserIdUsecase } from "@/application/usecases/user/DfUpdateNicknameByUserIdUsecase";
import { DfGetLikedNovelsByUserIdUsecase } from "@/application/usecases/novel/DfGetLikedNovelsByUserIdUsecase";
import { PrNovelLikeRepository } from "../repositories/PrNovelLikeRepository";
import { DfDeleteNovelByNovelIdUsecase } from "@/application/usecases/novel/DfDeleteNovelByNovelIdUsecase";
import { DfUpdateNovelSerialStatusByNovelIdUsecase } from "@/application/usecases/novel/DfUpdateNovelSerialStatusByNovelIdUsecase";
import { DfUpdateProfileImageByUserId } from "@/application/usecases/user/DfUpdateProfileImageByUserIdUsecase";
import { DfGetUserStatsByUserIdUsecase } from "@/application/usecases/user/DfGetUserStatsByUserIdUsecase";

export const userDi = {
  userRepository: new PrUserRepository(),
  verifyTokenUsecase: new DfVerifyAccessTokenUsecase(new PrUserRepository()),
  getUserIdUsecase: new DfGetUserIdUsecase(
    new PrUserRepository(),
    new DfVerifyAccessTokenUsecase(new PrUserRepository())
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
  loginUsecase: new DfLoginUsecase(
    new PrUserRepository(),
    new PrAuthRepository(),
    new DfPasswordVerificationUsecase()
  ),
  logoutUsecase: new DfLogoutUsecase(new PrAuthRepository()),
  postDetailByUserIdUsecase: new DfPostDetailByUserIdUsecase(
    new PrCommunityPostRepository()
  ),
  postStatusUpdateUsecase: new DfPostStatusUpdateUsecase(
    new PrCommunityPostRepository()
  ),
  likedCommunityPostsUsecase: new DfLikedCommunityPostsUsecase(
    new PrCommunityPostLikeRepository()
  ),
  getUserStatsByUserIdUsecase: new DfGetUserStatsByUserIdUsecase(
    new PrNovelRepository(),
    new PrCommunityPostRepository()
  ),
  updateIntroduceByUserIdUsecase: new DfUpdateIntroduceByUserIdUsecase(
    new PrUserRepository()
  ),
  updateNicknameByUserIdUsecase: new DfUpdateNicknameByUserIdUsecase(
    new PrUserRepository()
  ),
  getLikedNovelsUsecase: new DfGetLikedNovelsByUserIdUsecase(
    new PrNovelLikeRepository()
  ),
  getNovelByUserIdUsecase: new DfGetNovelByUserIdUsecase(
    new PrNovelRepository(),
    new DfEpisodeByUserIdUsecase(new PrNovelEpisodeRepository())
  ),
  getFundingByUserIdUsecase: new DfGetFundingByUserIdUsecase(
    new PrFundingRepository()
  ),
  deleteNovelByNovelIdUsecase: new DfDeleteNovelByNovelIdUsecase(
    new PrNovelRepository(),
    new FileService()
  ),
  updateNovelSerialStatusByNovelIdUsecase:
    new DfUpdateNovelSerialStatusByNovelIdUsecase(new PrNovelRepository()),
  updateProfileImageByUserIdUsecase: new DfUpdateProfileImageByUserId(
    new PrUserRepository(),
    new FileService()
  ),
};

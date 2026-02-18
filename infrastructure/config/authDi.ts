import { DfVerifyAccessTokenUsecase } from "@/application/usecases/auth/DfVerifyAccessTokenUsecase";
import { PrUserRepository } from "../repositories/PrUserRepository";
import { DfRefreshTokenUsecase } from "@/application/usecases/auth/DfRefreshTokenUsecase";
import { PrAuthRepository } from "../repositories/PrAuthRepository";

export const authDi = {
  verifyAccessTokenUsecase: new DfVerifyAccessTokenUsecase(
    new PrUserRepository(),
  ),
  refreshTokenUsecase: new DfRefreshTokenUsecase(new PrAuthRepository()),
};

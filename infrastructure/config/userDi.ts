import { DfVerifyAccessTokenUsecase } from "@/application/usecases/auth/DfVerifyAccessTokenUsecase";
import { PrUserRepository } from "../repositories/PrUserRepository";
import { DfGetUserIdUsecase } from "@/application/usecases/auth/DfGetUserIdUsecase";

export const userDi = {
  userRepository: new PrUserRepository(),
  verifyTokenUsecase: new DfVerifyAccessTokenUsecase(new PrUserRepository()),
  getUserIdUsecase: new DfGetUserIdUsecase(
    new PrUserRepository(),
    new DfVerifyAccessTokenUsecase(new PrUserRepository())
  ),
};

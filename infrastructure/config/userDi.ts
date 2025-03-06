import { DfVerifyAccessToken } from "@/application/usecases/auth/DfVerifyAccessToken";
import { PrUserRepository } from "../repositories/PrUserRepository";
import { DfGetUserIdUsecase } from "@/application/usecases/auth/DfGetUserIdUsecase";

export const userDi = {
  userRepository: new PrUserRepository(),
  verifyTokenUsecase: new DfVerifyAccessToken(new PrUserRepository()),
  getUserIdUsecase: new DfGetUserIdUsecase(
    new PrUserRepository(),
    new DfVerifyAccessToken(new PrUserRepository())
  ),
};

import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { PrUserRepository } from "../repositories/PrUserRepository";
import { DfGetUserIdUsecase } from "@/application/usecases/auth/DfGetUserIdUsecase";

export const userDi = {
  userRepository: new PrUserRepository(),
  verifyTokenUsecase: new DfVerifyRefreshToken(new PrUserRepository()),
  getUserIdUsecase: new DfGetUserIdUsecase(
    new PrUserRepository(),
    new DfVerifyRefreshToken(new PrUserRepository())
  ),
};

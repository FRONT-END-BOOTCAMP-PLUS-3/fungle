import { DfUpdateProfileImage } from "@/application/usecases/user/DfUpdateProfileImageUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." },
        { status: 400 }
      );
    }

    const userRepository: UserRepository = new PrUserRepository();

    const formData = await req.formData();
    const profileImage = formData.get("profileImage") as File;

    const updateProfileImageUsecase = new DfUpdateProfileImage(userRepository);
    await updateProfileImageUsecase.execute({ userId, profileImage });

    return NextResponse.json(
      { message: "프로필 사진이 성공적으로 수정되었습니다!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("프로필 사진 수정 오류: ", error);
    return NextResponse.json(
      { error: "서버에 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};

"use server";

import { LoginRequestDto } from "@/application/usecases/auth/dto/LoginRequestDto";
import { cookies } from "next/headers";

interface User {
  id: string;
  nickname: string;
  introduce: string;
  profileImage: string;
}

interface LoginState {
  message: string | null;
  isLoggedIn: boolean;
  user?: User | null;
}

export const loginProc = async (state: LoginState, formData: FormData) => {
  const userEmail = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const request: LoginRequestDto = { userEmail, password };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.error || "로그인 실패", isLoggedIn: false };
    }

    if (data.refreshToken) {
      const cookieStore = await cookies();
      cookieStore.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7일 유지
      });
    } else {
      return { message: "토큰이 누락되었습니다.", isLoggedIn: false };
    }

    return {
      message: null,
      isLoggedIn: true,
      user: {
        id: data.id,
        nickname: data.nickname,
        introduce: data.introduce,
        profileImage: data.profileImage,
      },
    };
  } catch (error) {
    return { message: "서버 오류가 발생했습니다.", isLoggedIn: false };
  }
};

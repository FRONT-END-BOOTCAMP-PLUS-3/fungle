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
  redirectUrl: string;
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
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.error || "로그인 실패",
        isLoggedIn: false,
        redirectUrl: "",
      };
    }

    const cookieStore = await cookies();

    if (data.refreshToken && data.accessToken) {
      cookieStore.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7일 유지
      });
      cookieStore.set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 60, // 30분 유지
      });
    } else {
      return {
        message: "토큰이 누락되었습니다.",
        isLoggedIn: false,
        redirectUrl: "",
      };
    }

    const lastUserId = cookieStore.get("lastUserId")?.value;
    const currentUserId = data.id;

    cookieStore.set("lastUserId", currentUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30일 유지
    });

    const returnUrl = cookieStore.get("returnUrl")?.value;
    const redirectUrl =
      returnUrl && lastUserId === currentUserId
        ? decodeURIComponent(returnUrl)
        : "/user/novel";

    cookieStore.delete("returnUrl");

    return {
      message: null,
      isLoggedIn: true,
      redirectUrl,
      user: {
        id: data.id,
        nickname: data.nickname,
        introduce: data.introduce,
        profileImage: data.profileImage,
      },
    };
  } catch (error: unknown) {
    return {
      message: "서버 오류가 발생했습니다.",
      error: error instanceof Error ? error.message : "알 수 없는 오류",
      isLoggedIn: false,
      redirectUrl: "",
    };
  }
};

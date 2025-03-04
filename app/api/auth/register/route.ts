// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, nickname, password } = await request.json();

    if (!email || !nickname || !password) {
      return NextResponse.json(
        { message: "이메일, 닉네임, 비밀번호 필드를 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        userEmail: email,
        nickname: nickname,
        password: hashedPassword,
        profileImage: null,
        id: undefined,
        introduce: "",
        type: undefined,
      },
    });

    return NextResponse.json(
      {
        message: "회원가입 성공! 가입 정보를 업데이트했습니다.",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("회원가입 에러:", error);
    let errorMessage = "서버 에러가 발생했습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

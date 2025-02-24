"use client";

import Input from "@/components/input/Input";
import {
  ErrorMessage,
  FormWrapper,
  InputWrapper,
  LoginContainer,
  Logo,
  SignupLink,
  SignupWrapper,
} from "./LoginPage.styled";
import { useState } from "react";
import Button from "@/components/button/Button";
import { LoginRequestDto } from "@/application/usecases/auth/dto/LoginRequestDto";
import { useRouter } from "next/navigation";
import { LoginError } from "@/application/usecases/auth/error/LoginError";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      emailRegex.test(email) ? "" : "이메일 형식에 맞게 입력해주세요."
    );
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const request: LoginRequestDto = { userEmail: email, password };
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.error);
        return;
      }

      // 로그인 성공 시 토큰 저장
      console.log("로그인 성공: ", response);

      // 로그인 후 사용자 페이지로 이동
      router.push("/user/novel");
    } catch (error) {
      // setLoginError(
      //   error instanceof LoginError ? error.message : "로그인 실패"
      // );
      console.error("로그인 실패", error);
      return;
    }
  };

  return (
    <LoginContainer>
      <Logo src="/logo/FUNGLE.svg" />
      <FormWrapper onSubmit={handleLogin}>
        <InputWrapper>
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요."
            onChange={(e) => {
              validateEmail(e.target.value);
              setEmail(e.target.value);
            }}
            name="email"
            type="email"
            // required
          />
          <ErrorMessage>{emailError}</ErrorMessage>
        </InputWrapper>

        <InputWrapper>
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <ErrorMessage>{loginError}</ErrorMessage>
        </InputWrapper>

        <Button buttonSize="big">로그인</Button>
      </FormWrapper>
      <SignupWrapper>
        계정이 없으신가요?&nbsp;
        <SignupLink href="/signup">회원가입</SignupLink>
      </SignupWrapper>
    </LoginContainer>
  );
};

export default Page;

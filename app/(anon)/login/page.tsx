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

const Page = () => {
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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    // 로그인 요청 로직 추가 예정
    // 로그인 실패 시 setLoginError("유효하지 않은 이메일 또는 비밀번호입니다.");
    console.log("로그인 요청: ", { email, password });
  };

  return (
    <LoginContainer>
      <Logo src="/logo/FUNGLE.svg" />
      <FormWrapper action="/user/main" onSubmit={handleLogin}>
        {/* 로그인 백엔드 개발 후 /api/login으로 변경 */}
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

"use client";

import Input from "@/components/input/Input";
import {
  FormWrapper,
  LoginButton,
  LoginContainer,
  Logo,
  SignupLink,
  SignupWrapper,
} from "./LoginPage.styled";

const Page = () => {
  return (
    <LoginContainer>
      <Logo src="/logo/FUNGLE.svg" />
      <FormWrapper action="/user/main">
        {/* 로그인 백엔드 개발 후 /api/login으로 변경 */}
        <Input
          label="이메일"
          placeholder="이메일을 입력해주세요."
          name="email"
          type="email"
          required
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          type="password"
          required
        />
        <LoginButton $backgroundColor="primary" className="button-big">
          로그인
        </LoginButton>
      </FormWrapper>
      <SignupWrapper>
        계정이 없으신가요?&nbsp;
        <SignupLink href="/signup">회원가입</SignupLink>
      </SignupWrapper>
    </LoginContainer>
  );
};

export default Page;

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
import { useActionState, useEffect } from "react";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { loginProc } from "./actions/loginProc";
import useAuthStore from "@/store/useAuthStore";

const initialState = { message: null, isLoggedIn: false };

const Page = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(loginProc, initialState);
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (state.isLoggedIn) {
      if (state.user) {
        setUser(state.user);
      }
      router.push("/user/novel");
    }
  }, [state.isLoggedIn, router]);

  return (
    <LoginContainer>
      <Logo src="/logo/FUNGLE.svg" />
      <FormWrapper action={formAction}>
        <InputWrapper>
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요."
            name="email"
            type="email"
          />
        </InputWrapper>

        <InputWrapper>
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            type="password"
          />
        </InputWrapper>
        <ErrorMessage>{state.message}</ErrorMessage>

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

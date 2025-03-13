"use client";

import Input from "@/components/input/Input";
import {
  ErrorMessage,
  FormWrapper,
  InputWrapper,
  LoginContainer,
  SignupLink,
  SignupWrapper,
} from "./LoginPage.styled";
import { useActionState, useEffect } from "react";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { loginProc } from "./actions/loginProc";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";

const initialState = {
  message: null,
  isLoggedIn: false,
  redirectUrl: "",
};

const Page = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(loginProc, initialState);
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (state.isLoggedIn) {
      if (state.user) {
        const user = state.user;
        setUser(user);
      }
      const redirectTo = state.redirectUrl || "/user/novel";
      router.push(redirectTo);

      state.redirectUrl = "";
    }
  }, [state, state?.isLoggedIn, state?.user, setUser, router]);

  useEffect(() => {
    const alertMessage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("alertMessage="))
      ?.split("=")[1];

    if (alertMessage) {
      setTimeout(() => {
        alert(decodeURIComponent(alertMessage));
      }, 100);
    }
  }, []);

  return (
    <LoginContainer>
      <Image src="/logo/FUNGLE.svg" alt="펀글 로고" width={180} height={180} />
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

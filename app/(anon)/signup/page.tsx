"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SignupContainer,
  SignupForm,
  Label,
  EmailWrapper,
  NicknameWrapper,
  InputFieldWrapper,
  ButtonWrapper,
  LogoWrapper,
  ErrorMessage,
} from "./Signup.styled";
import Button from "@/components/button/Button";
import InputField from "@/components/input/Input";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      emailRegex.test(email) ? "" : "이메일 형식에 맞게 입력해주세요."
    );
  };

  const handleNicknameCheck = () => {
    setNicknameError(
      nickname === "사용불가닉네임"
        ? "이미 중복된 닉네임입니다. / 영문, 한글, 숫자만 가능합니다."
        : "사용가능한 닉네임입니다."
    );
  };

  const validatePassword = () => {
    setPasswordError(
      password.length < 8
        ? "비밀번호는 숫자, 소문자 포함 8자리 이상입니다."
        : ""
    );
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("회원가입 요청:", { email, nickname, password });
  };

  return (
    <SignupContainer>
      <LogoWrapper>
        <Image
          src="/logo/FUNGLE.svg"
          alt="Fungle Logo"
          width={177}
          height={70}
          priority
        />
      </LogoWrapper>

      <SignupForm onSubmit={handleSignup}>
        <Label>이메일</Label>
        <EmailWrapper>
          <InputFieldWrapper hasError={!!emailError}>
            <InputField
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              required
            />
          </InputFieldWrapper>
          <ButtonWrapper>
            <Button type="button">이메일 인증</Button>
          </ButtonWrapper>
        </EmailWrapper>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <InputFieldWrapper>
          <InputField
            type="text"
            placeholder="이메일 인증 코드"
            value={emailCode}
          />
        </InputFieldWrapper>

        <Label>닉네임</Label>
        <NicknameWrapper>
          <InputFieldWrapper hasError={!!nicknameError}>
            <InputField
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </InputFieldWrapper>
          <ButtonWrapper>
            <Button type="button" onClick={handleNicknameCheck}>
              중복검사
            </Button>
          </ButtonWrapper>
        </NicknameWrapper>
        {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}

        <Label>비밀번호</Label>
        <InputFieldWrapper hasError={!!passwordError}>
          <InputField
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword();
            }}
          />
        </InputFieldWrapper>
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        <Label>비밀번호 확인</Label>
        <InputFieldWrapper hasError={password !== confirmPassword}>
          <InputField
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputFieldWrapper>
        {password !== confirmPassword && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}

        <Button type="submit" className="full-width">
          회원가입
        </Button>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  SignupContainer,
  SignupForm,
  Label,
  InputGroupWrapper,
  InputGroup,
  ButtonWrapper,
  LogoWrapper,
  ErrorMessage,
  InputWrapper,
} from "./Signup.styled";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(
    "비밀번호는 숫자, 소문자 포함 8자리 이상입니다."
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      email !== "" &&
        nickname !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        !emailError &&
        !nicknameError &&
        !passwordError &&
        !confirmPasswordError &&
        password === confirmPassword
    );
  }, [
    email,
    nickname,
    password,
    confirmPassword,
    emailError,
    nicknameError,
    passwordError,
    confirmPasswordError,
  ]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      emailRegex.test(email) ? "" : "이메일 형식에 맞게 입력해주세요."
    );
  };

  const handleNicknameCheck = () => {
    if (nickname === "사용불가닉네임") {
      setNicknameError(
        "이미 중복된 닉네임입니다. / 영문, 한글, 숫자만 가능합니다."
      );
    } else {
      setNicknameError("사용 가능한 닉네임입니다.");
    }
  };

  const validatePassword = (password: string) => {
    setPassword(password);
    if (password.length < 8) {
      setPasswordError("비밀번호는 숫자, 소문자 포함 8자리 이상입니다.");
    } else {
      setPasswordError("");
    }
  };

  const checkPasswordMatch = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
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
        <InputGroupWrapper>
          <InputGroup>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              $size="big"
              required
            />
            <ButtonWrapper>
              <Button type="button">이메일 인증</Button>
            </ButtonWrapper>
          </InputGroup>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputGroupWrapper>

        <InputWrapper>
          <Input
            type="text"
            placeholder="이메일 인증 코드"
            value={emailCode}
            $size="big"
          />
        </InputWrapper>

        <Label>닉네임</Label>
        <InputGroupWrapper>
          <InputGroup>
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              $size="big"
              required
            />
            <ButtonWrapper>
              <Button type="button" onClick={handleNicknameCheck}>
                중복검사
              </Button>
            </ButtonWrapper>
          </InputGroup>
          {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
        </InputGroupWrapper>

        <Label>비밀번호</Label>
        <InputWrapper>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            $size="big"
            required
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputWrapper>

        <Label>비밀번호 확인</Label>
        <InputWrapper>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={confirmPassword}
            onChange={(e) => checkPasswordMatch(e.target.value)}
            $size="big"
            required
          />
          {confirmPasswordError && (
            <ErrorMessage>{confirmPasswordError}</ErrorMessage>
          )}
        </InputWrapper>

        <Button type="submit" disabled={!isFormValid}>
          회원가입
        </Button>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

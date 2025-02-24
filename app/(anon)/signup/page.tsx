"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  SignupContainer,
  SignupForm,
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
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameChecked, setNicknameChecked] = useState(false);
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
        isNicknameValid &&
        nicknameChecked &&
        password !== "" &&
        confirmPassword !== "" &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        password === confirmPassword
    );
  }, [
    email,
    isNicknameValid,
    nicknameChecked,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
  ]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      emailRegex.test(email) ? "" : "이메일 형식에 맞게 입력해주세요."
    );
  };

  const validateNickname = (nickname: string) => {
    const nicknameRegex = /^[A-Za-z가-힣]{1,6}$/;
    if (!nicknameRegex.test(nickname)) {
      setNicknameError("최대 6자까지 가능하며, 영문/한글만 입력해주세요.");
      setIsNicknameValid(false);
      setNicknameChecked(false);
    } else {
      setNicknameError("");
      setIsNicknameValid(true);
      setNicknameChecked(false);
    }
  };

  const handleNicknameCheck = () => {
    if (!isNicknameValid) return;

    if (nickname === "사용불가닉네임") {
      setNicknameError("이미 중복된 닉네임입니다.");
      setIsNicknameValid(false);
    } else {
      setNicknameError("사용 가능한 닉네임입니다.");
      setIsNicknameValid(true);
    }

    setNicknameChecked(true);
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
    setConfirmPasswordError(
      password !== confirmPassword ? "비밀번호가 일치하지 않습니다." : ""
    );
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
              label="이메일"
              required
            />
            <ButtonWrapper>
              <Button type="button" buttonSize="small">
                이메일 인증
              </Button>
            </ButtonWrapper>
          </InputGroup>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputGroupWrapper>

        <InputWrapper>
          <Input
            type="text"
            placeholder="이메일 인증 코드"
            value={emailCode}
            label="이메일 인증 코드"
            hideLabel={true}
            onChange={(e) => setEmailCode(e.target.value)}
          />
        </InputWrapper>

        <InputGroupWrapper>
          <InputGroup>
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                validateNickname(e.target.value);
              }}
              label="닉네임"
              required
            />
            <ButtonWrapper>
              <Button
                type="button"
                onClick={handleNicknameCheck}
                buttonSize="small"
              >
                중복검사
              </Button>
            </ButtonWrapper>
          </InputGroup>
          {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
        </InputGroupWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            label="비밀번호"
            required
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={confirmPassword}
            onChange={(e) => checkPasswordMatch(e.target.value)}
            label="비밀번호 확인"
            required
          />
          {confirmPasswordError && (
            <ErrorMessage>{confirmPasswordError}</ErrorMessage>
          )}
        </InputWrapper>

        <Button type="submit" disabled={!isFormValid} buttonSize="big">
          회원가입
        </Button>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

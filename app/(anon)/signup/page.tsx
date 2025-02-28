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
  const [isEmailVerified, setIsEmailVerified] = useState(false); // ✅ 이메일 인증 여부 추가
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
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setIsFormValid(
      email !== "" &&
        isEmailVerified &&
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
    isEmailVerified,
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

  const handleVerifyEmailCode = async () => {
    if (!email || !emailCode) {
      setEmailError("이메일과 인증 코드를 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode: emailCode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setIsEmailVerified(true); // ✅ 인증 완료 상태 변경
      alert("이메일 인증이 완료되었습니다!");
    } catch (error: unknown) {
      setIsEmailVerified(false);
      if (error instanceof Error) {
        setEmailError(error.message);
      } else {
        setEmailError("알 수 없는 오류가 발생했습니다.");
      }
    }
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

  const handleNicknameCheck = async () => {
    if (!isNicknameValid) return;

    try {
      const res = await fetch("/api/auth/check-nickname", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // 닉네임 사용 가능 여부 설정
      setNicknameChecked(true);
      setIsNicknameValid(true);
      setNicknameError("✅ 사용 가능한 닉네임입니다.");
    } catch (error: unknown) {
      setNicknameChecked(false);
      setIsNicknameValid(false);

      if (error instanceof Error) {
        setNicknameError(error.message);
      } else {
        setNicknameError("❌ 알 수 없는 오류가 발생했습니다.");
      }
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
    setConfirmPasswordError(
      password !== confirmPassword ? "비밀번호가 일치하지 않습니다." : ""
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setServerError(""); // 초기화

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nickname,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("회원가입이 완료되었습니다!");
      router.push("/"); // 성공 시 메인 페이지로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("알 수 없는 오류가 발생했습니다.");
      }
    }
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
              <Button
                type="button"
                buttonSize="small"
                disabled={isEmailVerified}
              >
                {isEmailVerified ? "인증 완료" : "이메일 인증"}
              </Button>
            </ButtonWrapper>
          </InputGroup>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputGroupWrapper>

        <InputGroupWrapper>
          <InputGroup>
            <Input
              type="text"
              placeholder="이메일 인증 코드"
              value={emailCode}
              label="이메일 인증 코드"
              hideLabel={true}
              onChange={(e) => setEmailCode(e.target.value)}
            />
            <ButtonWrapper>
              <Button
                type="button"
                onClick={handleVerifyEmailCode}
                buttonSize="small"
                disabled={isEmailVerified}
              >
                {isEmailVerified ? "인증 완료" : "인증 코드 확인"}
              </Button>
            </ButtonWrapper>
          </InputGroup>
        </InputGroupWrapper>

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

        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

        <Button type="submit" disabled={!isFormValid} buttonSize="big">
          회원가입
        </Button>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

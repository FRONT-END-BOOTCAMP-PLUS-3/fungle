"use client";

import { useState } from "react";
import {
  InputGroupWrapper,
  InputGroup,
  ButtonWrapper,
  ErrorMessage,
} from "../Signup.styled";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";

interface EmailVerificationProps {
  email: string;
  setEmail: (email: string) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (verified: boolean) => void;
}

const EmailVerification = ({
  email,
  setEmail,
  isEmailVerified,
  setIsEmailVerified,
}: EmailVerificationProps) => {
  const [emailError, setEmailError] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleRequestVerification = async () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("/api/auth/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setIsCodeSent(true);
      setEmailError("");
      alert("인증 코드가 이메일로 전송되었습니다!");
    } catch (error: unknown) {
      setIsCodeSent(false);
      setEmailError(
        error instanceof Error ? error.message : "❌ 이메일 전송 오류 발생"
      );
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!email || !emailCode) {
      setEmailError("이메일과 인증 코드를 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode: emailCode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다!");
    } catch (error: unknown) {
      setIsEmailVerified(false);
      setEmailError(
        error instanceof Error ? error.message : "❌ 인증 오류 발생"
      );
    }
  };

  return (
    <>
      <InputGroupWrapper>
        <InputGroup>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="이메일"
            required
            disabled={isEmailVerified} // 🔹 인증 완료 시 비활성화
          />
          <ButtonWrapper>
            <Button
              type="button"
              buttonSize="small"
              onClick={handleRequestVerification}
              disabled={isEmailVerified}
            >
              {isEmailVerified
                ? "인증 완료"
                : isCodeSent
                ? "재전송"
                : "이메일 인증"}
            </Button>
          </ButtonWrapper>
        </InputGroup>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      </InputGroupWrapper>

      {isCodeSent && (
        <InputGroupWrapper>
          <InputGroup>
            <Input
              type="text"
              placeholder="이메일 인증 코드"
              value={emailCode}
              label="이메일 인증 코드"
              hideLabel={true}
              onChange={(e) => setEmailCode(e.target.value)}
              disabled={isEmailVerified} // 🔹 인증 완료 시 비활성화
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
      )}
    </>
  );
};

export default EmailVerification;

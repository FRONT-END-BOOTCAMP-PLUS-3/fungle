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

      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다!");
    } catch (error: unknown) {
      setIsEmailVerified(false);
      setEmailError(error instanceof Error ? error.message : "알 수 없는 오류");
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
          />
          <ButtonWrapper>
            <Button type="button" buttonSize="small" disabled={isEmailVerified}>
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
    </>
  );
};

export default EmailVerification;

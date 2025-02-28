"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignupContainer, SignupForm, LogoWrapper } from "./Signup.styled";
import EmailVerification from "./components/EmailVerification";
import NicknameValidation from "./components/NicknameValidation";
import PasswordFields from "./components/PasswordFields";
import SubmitButton from "./components/SignupButton";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        password === confirmPassword
    );
  }, [
    email,
    isEmailVerified,
    isNicknameValid,
    nicknameChecked,
    password,
    confirmPassword,
  ]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setServerError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nickname, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("회원가입이 완료되었습니다!");
      router.push("/");
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
        {/* ✅ 이메일 인증 컴포넌트 */}
        <EmailVerification
          email={email}
          setEmail={setEmail}
          isEmailVerified={isEmailVerified}
          setIsEmailVerified={setIsEmailVerified}
        />

        {/* ✅ 닉네임 중복 검사 컴포넌트 */}
        <NicknameValidation
          nickname={nickname}
          setNickname={setNickname}
          isNicknameValid={isNicknameValid}
          setIsNicknameValid={setIsNicknameValid}
          nicknameChecked={nicknameChecked}
          setNicknameChecked={setNicknameChecked}
        />

        {/* ✅ 비밀번호 입력 필드 */}
        <PasswordFields
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

        {/* ✅ 회원가입 버튼 */}
        <SubmitButton isFormValid={isFormValid} serverError={serverError} />
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

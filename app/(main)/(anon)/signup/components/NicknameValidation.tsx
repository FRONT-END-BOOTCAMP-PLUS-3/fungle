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

interface NicknameValidationProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  isNicknameValid: boolean;
  setIsNicknameValid: (valid: boolean) => void;
  nicknameChecked: boolean;
  setNicknameChecked: (checked: boolean) => void;
}

const NicknameValidation = ({
  nickname,
  setNickname,
  isNicknameValid,
  setIsNicknameValid,
  nicknameChecked,
  setNicknameChecked,
}: NicknameValidationProps) => {
  const [nicknameError, setNicknameError] = useState("");

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
      console.log(data);

      // ✅ 닉네임 사용 가능 여부 업데이트
      setNicknameChecked(true);
      setIsNicknameValid(true);
      setNicknameError("✅ 사용 가능한 닉네임입니다.");
    } catch (error: unknown) {
      setNicknameChecked(false);
      setIsNicknameValid(false);
      setNicknameError(
        error instanceof Error
          ? error.message
          : "❌ 알 수 없는 오류가 발생했습니다."
      );
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

  return (
    <InputGroupWrapper>
      <InputGroup>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            validateNickname(e.target.value);
            setNicknameChecked(false); // 🔄 닉네임 변경 시 다시 확인 필요
          }}
          label="닉네임"
          required
        />
        <ButtonWrapper>
          <Button
            type="button"
            onClick={handleNicknameCheck}
            buttonSize="small"
            disabled={nicknameChecked} // ✅ 중복 확인 완료 후 버튼 비활성화
          >
            {nicknameChecked ? "✔ 확인 완료" : "중복검사"}
          </Button>
        </ButtonWrapper>
      </InputGroup>
      {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
    </InputGroupWrapper>
  );
};

export default NicknameValidation;

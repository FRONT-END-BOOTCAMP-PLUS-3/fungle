import { useState } from "react";
import { InputWrapper, ErrorMessage } from "../Signup.styled";
import Input from "@/components/input/Input";

interface PasswordFieldsProps {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
}

const PasswordFields = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: PasswordFieldsProps) => {
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = (password: string) => {
    setPassword(password);
    if (password.length < 8) {
      setPasswordError("비밀번호는 숫자, 소문자 포함 8자리 이상이어야 합니다.");
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

  return (
    <>
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
    </>
  );
};

export default PasswordFields;

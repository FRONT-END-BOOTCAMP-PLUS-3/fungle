import styled from "styled-components";
import { InputComponent } from "@/components/input/Input.styled";

export const SignupContainer = styled.div`
  margin: 3.3rem auto 0 auto;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 1.1rem;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 0.2rem;
`;

export const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
  margin-bottom: 1.6rem;

  ${InputComponent} {
    flex: 4;
    min-width: 72%;
  }
`;

export const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
  margin-bottom: 1.6rem;

  ${InputComponent} {
    flex: 3;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.6rem;
`;

export const ButtonWrapper = styled.div`
  height: 2.5rem;

  button {
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: #0f1670;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: red;
  margin-top: 0.25rem;
`;

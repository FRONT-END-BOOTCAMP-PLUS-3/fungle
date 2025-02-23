import styled from "styled-components";

export const SignupContainer = styled.div`
  margin: 3.4rem auto 0 auto;
  padding: 1rem;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
`;

export const InputFieldWrapper = styled.div<{ hasError?: boolean }>`
  width: 100%;
  margin-bottom: 1rem;

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 0.0625rem solid ${({ hasError }) => (hasError ? "red" : "#ccc")};
    font-size: 1rem;
    background-color: white;
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${({ hasError }) => (hasError ? "red" : "#141e8e")};
      box-shadow: 0 0 0.3125rem rgba(20, 30, 142, 0.3);
    }

    &::placeholder {
      color: #bbb;
      font-size: 0.6rem;
    }
  }
`;

export const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
  margin-bottom: 1rem;

  input {
    flex: 4;
    min-width: 72%;
  }
`;

export const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
  margin-bottom: 1rem;

  input {
    flex: 3;
  }
`;

export const ButtonWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 2.75rem;
  margin-bottom: 1rem;

  button {
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: #0f1670;
    }
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: red;
  margin-top: 0.25rem;
`;

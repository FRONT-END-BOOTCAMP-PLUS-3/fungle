import styled from "styled-components";

export const SignupContainer = styled.div`q
  max-width: 100%;
  min-height: 100vh;
  padding: 2rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: auto;
  gap: 1.6rem;
`;

export const LogoWrapper = styled.div`
  align-self: flex-start;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  gap: 1.6rem;
`;

export const InputGroupWrapper = styled.div`
  width: 100%;
`;

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 100%;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  max-width: 100%;
  gap: 0.5rem;
  flex-wrap: nowrap;
`;

export const ButtonWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: var(--error-color);
  word-wrap: break-word;
  max-width: 100%;
`;

import Link from "next/link";
import styled from "styled-components";

export const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1.25rem;
  justify-content: center;
  height: 100vh;
`;

export const Logo = styled.img`
  width: 11.25rem;
  height: auto;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
`;

export const SignupWrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: var(--font-size-base);
  color: var(--gray-500);
`;

export const SignupLink = styled(Link)`
  color: var(--black-color);
  text-decoration: none;
  font-weight: 600;
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: var(--error-color);
  min-height: 1.8rem;
  visibility: ${({ children }) => (children ? "visible" : "hidden")};
`;

"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  position: relative;
`;

export const Label = styled.label<{ $srOnly?: boolean }>`
  font-weight: 700;
  font-size: var(--font-size-lg);

  ${({ $srOnly }) =>
    $srOnly &&
    `
      overflow: hidden;
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: circle(0);
      width: 1px;
      height: 1px;
      margin: -1px;
      white-space: nowrap;
    `}
`;

interface InputProps {
  src?: string;
  $iconPosition?: "left" | "right";
}

export const InputComponent = styled.input<InputProps>`
  border-color: var(--gray-300);
  border-radius: 0.625rem;
  font-size: var(--font-size-placeholder);
  padding: 0.625rem 1rem;
  text-align: left;
  ${({ src }) =>
    src &&
    `
    background-image: url(${src});
    background-size: 1.25rem 1.25rem;
    background-position: 0.875rem center;
    background-repeat: no-repeat;
  `}
  ${({ $iconPosition }) =>
    $iconPosition === "left"
      ? `
      background-position: 0.875rem center;
      padding-left: 3rem;
    `
      : `
      background-position: calc(100% - 0.875rem) center;
      padding-right: 3rem;
    `}
`;

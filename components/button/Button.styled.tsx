"use client";
import styled from "styled-components";

interface ButtonProps {
  $fontSize?: "big" | "medium" | "small";
  $buttonSize?: "big" | "medium" | "small" | "xsmall";
  $backgroundColor?: "primary" | "white" | "leave" | "success";
  disabled?: boolean;
}

export const ButtonComponent = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.625rem;
  color: ${(props) =>
    props.$backgroundColor === "white"
      ? "var(--black-color)"
      : "var(--white-color)"};
  background-color: ${(props) =>
    props.$backgroundColor === "primary"
      ? "var(--primary-color)"
      : props.$backgroundColor === "white"
      ? "var(--white-color)"
      : props.$backgroundColor === "success"
      ? "var(--success-color)"
      : "var(--leave-color)"};
  border: ${(props) =>
    props.$backgroundColor === "white" ? "1px solid var(--gray-500)" : "none"};
  cursor: pointer;
  /* padding: 0.625rem 0; */
  padding: ${(props) =>
    props.$buttonSize === "xsmall" ? "0.3rem 0" : "0.625rem 0"};
  width: ${(props) =>
    props.$buttonSize === "big"
      ? "100%"
      : props.$buttonSize === "medium"
      ? "15.313rem"
      : props.$buttonSize === "small"
      ? "6.25rem"
      : "3rem"};
  font-size: var(--font-size-placeholder);

  &:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
    border: none;

    &:hover {
      background-color: var(--disabled-color);
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.$backgroundColor === "primary"
        ? "var(--hover-color)"
        : props.$backgroundColor === "white"
        ? "var(--gray-100)"
        : "#e57373"};

    border: ${(props) =>
      props.$backgroundColor === "white"
        ? "1px solid var(--gray-500)"
        : "none"};
  }
`;

import styled from "styled-components";

interface ButtonProps {
  $fontSize?: "big" | "medium" | "small";
  $buttonSize?: "big" | "medium" | "small";
  $backgroundColor?: "primary" | "white" | "leave";
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
      : "var(--leave-color)"};
  border: ${(props) =>
    props.$backgroundColor === "white" ? "1px solid var(--gray-500)" : "none"};
  cursor: pointer;
  padding: ${(props) =>
    props.$buttonSize === "big"
      ? "0.625rem 7.5rem"
      : props.$buttonSize === "medium"
      ? "0.625rem 4.125rem"
      : "0.625rem 0.625rem"};

  &:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
    border: none;
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

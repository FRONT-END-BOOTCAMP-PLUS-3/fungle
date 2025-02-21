import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: var(--font-size-lg);
`;

interface InputProps {
  src?: string;
  $size?: string;
}

export const InputComponent = styled.input<InputProps>`
  width: ${(props) =>
    props.$size === "big"
      ? "20.938rem"
      : props.$size === "medium"
      ? "15.313rem"
      : "6.25rem"};
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
    padding-left: 3rem;
  `}
`;

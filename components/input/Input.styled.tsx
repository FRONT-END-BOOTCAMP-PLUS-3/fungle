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

export const InputComponent = styled.input<{ src?: string }>`
  width: 100%;
  border-color: var(--gray-300);
  border-radius: 0.625rem;
  font-size: var(--font-size-placeholder);
  padding: 10px 16px;
  text-align: left;
  ${({ src }) =>
    src &&
    `
    background-image: url(${src});
    background-size: 20px 20px;
    background-position: 14px center;
    background-repeat: no-repeat;
    padding-left: 48px;
  `}
`;

import { styled } from "styled-components";

export const NicknameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

export const NicknameBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const InputBox = styled.div`
  width: 6rem;

  input {
    height: 100%;
    padding: 0.3rem;
    text-align: center;
  }
`;

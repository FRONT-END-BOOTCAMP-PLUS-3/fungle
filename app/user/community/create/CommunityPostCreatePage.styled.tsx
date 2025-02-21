import styled from "styled-components";

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: auto;
  padding: 0 1.25rem 1.25rem 1.25rem;
  margin-top: 1.25rem;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.625rem;
`;

export const TextAreaWrapper = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

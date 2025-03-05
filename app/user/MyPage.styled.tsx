import styled from "styled-components";

export const Main = styled.div`
  overflow-y: scroll;
  padding: 1rem;
  display: flex;
  gap: 1.25rem;
  flex-direction: column;
`;

export const Divider = styled.hr`
  width: 100%;
  height: 0.0635rem;
  min-height: 0.0635rem;
  background: var(--gray-300);
  border: 0;
`;

export const ViewInfoSection = styled.section`
  width: 100%;
  margin-top: 0.625rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

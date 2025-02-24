import styled from "styled-components";

export const CommunityPostHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-500);
  padding: 1.25rem 0;
  gap: 0.625rem;
`;

export const CommunityPostInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CommunityPostTitle = styled.h1`
  font-size: 1.5rem;
`;

export const CommunityPostStats = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
`;

export const CommunityPostCreated = styled.p`
  font-size: 0.625rem;
`;
export const CommunityPostview = styled.p`
  font-size: 0.625rem;
  color: var(--gray--300);
`;

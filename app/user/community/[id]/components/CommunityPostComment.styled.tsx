import styled from "styled-components";

export const CommunityLikeButton = styled.button`
  display: flex;
  gap: 0.3125rem;
  align-items: center;
  background-color: inherit;
  border: none;
`;
export const CommunityPostCommentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  border: 1px solid var(--gray-500);
  padding: 1rem;
  border-radius: 0.625rem;
`;

export const CommunityPostCommentProfile = styled.div`
  width: 30px;
  height: 30px;
  background-color: var(--gray-500);
  border-radius: 50%;
`;

export const CommunityPostCommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
`;

export const CommunityPostCommentInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const CommunityPostCommentEditButton = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
  padding: 0.625rem;
`;

export const CommunityPostCommentAutor = styled.p`
  font-size: 0.875rem;
`;
export const CommunityPostCommentCreated = styled.p`
  font-size: 0.625rem;
`;

export const CommunityPostContent = styled.p`
  font-size: 1rem;
  height: 100%;
`;

export const CommunityCommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
`;
export const CommunityReply = styled.div`
  display: flex;
  gap: 0.3125rem;
  align-items: center;
  background-color: inherit;
  border: none;
`;

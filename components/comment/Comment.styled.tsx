"use client";
import styled from "styled-components";

export const CommentFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
export const CommunityLikeButton = styled.button`
  display: flex;
  gap: 0.3125rem;
  align-items: center;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;
export const CommunityPostCommentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 0.0625rem solid var(--gray-300);
  padding: 0.875rem;
  border-radius: 0.625rem;
`;

export const CommunityPostCommentProfile = styled.div`
  width: 1.875rem;
  height: 1.875rem;
  background-color: var(--gray-500);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;

export const CommunityPostCommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
  border-bottom: 0.0625rem solid var(--gray-300);
  padding-bottom: 0.625rem;
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
  justify-content: space-between;
`;
export const CommunityCommentBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const CommunityReplyButton = styled.button`
  display: flex;
  gap: 0.625rem;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

import { styled } from "styled-components";

export const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.625rem 0 0 0;
  border-top: 0.0625rem solid var(--gray-300);
`;
export const ReplyCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  border-bottom: 0.0625rem solid var(--gray-300);
  padding: 0.625rem 0.625rem 0.625rem 1rem;
`;
export const ReplyCommentProfile = styled.div`
  width: 1.875rem;
  height: 1.875rem;
  background-color: var(--gray-500);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;

export const ReplyCommentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
`;

export const ReplyCommentAuthor = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
`;
export const ReplyCommentCreated = styled.p`
  font-size: 0.625rem;
`;

export const ReplyAuthor = styled.div`
  background-color: var(--primary-color);
  padding: 0 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
`;

export const Author = styled.p`
  font-size: 0.5625rem;
  color: var(--gray-100);
`;

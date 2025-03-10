"use client";
import styled from "styled-components";
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  position: relative;
`;
export const PostList = styled.div`
  width: 100%;
  font-size: var(--font-size-xxl);
  text-align: center;
  margin: 0 auto;
  font-weight: 800;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const PostListContainer = styled.ul`
  border-top: 0.0625rem solid var(--gray-300);
  position: relative;
`;

export const PostListWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.9375rem 0;
  border-bottom: 0.0625rem solid var(--gray-300);
`;

export const PostStatusWithNickname = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  align-items: center;
`;

export const PostStatus = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8125rem;
  height: 1.25rem;
  background-color: ${({ status }) =>
    status === "recruiting" ? "var(--success-color)" : "var(--gray-500)"};
  border-radius: 1.25rem;
  color: white;
  font-size: 0.625rem;
`;

export const PostUserNickname = styled.p`
  font-size: 0.75rem;
`;

export const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

export const PostContent = styled.p`
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostRecruitment = styled.p`
  font-size: 0.625rem;
  color: var(--primary-color);
`;
export const PostTime = styled.p`
  font-size: 0.75rem;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostInfo = styled.div`
  display: flex;
  gap: 0.3125rem;
`;

export const PostStats = styled.div`
  display: flex;
  gap: 0.625rem;
`;

import styled from "styled-components";

export const PostListContainer = styled.ul`
  border-top: 1px solid var(--gray-300);
`;

export const PostListWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.9375rem 0;
  border-bottom: 1px solid var(--gray-300);
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

export const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostContent = styled.p`
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostGenre = styled.p`
  font-size: 0.75rem;
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
  gap: 0.625rem;
`;

export const PostStats = styled.div`
  display: flex;
  gap: 0.625rem;
`;

export const PostStatsItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3125rem;
  font-size: 0.75rem;
  align-items: center;
`;

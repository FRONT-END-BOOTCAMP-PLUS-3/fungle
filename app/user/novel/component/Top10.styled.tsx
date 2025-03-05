import styled from "styled-components";

styled


interface ListItemProps {
  $isLast: boolean;
}

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`;

export const ListItem = styled.div<ListItemProps>`
  display: flex;
  align-items: center;
  padding:  0.9375rem;
  border-bottom: ${({ $isLast }) => ($isLast ? "none" : "0.0625rem solid var(--gray-500)")};
  gap:  0.9375rem;

  .rank {
    font-size: var(--font-size-xxl);
    font-weight: bold;
  }

  .thumbnail {
    position: relative;
    width: 3.75rem;  
    height: 5rem;    
    border-radius: 0.3125rem;
    overflow: hidden;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: var(--font-size-lg);
    font-weight: bold;
  }

  .author {
    font-size: var(--font-size-base);
    color: var(--gray-500);
    margin-top : -0.4375rem;
  }

  .tags {
    font-size: var(--font-size-footer);
    color: var(--primary-color);
    margin-top: 0.4375rem;
  }
`;
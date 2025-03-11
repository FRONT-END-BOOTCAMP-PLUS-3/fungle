import styled from "styled-components";
import Image from "next/image";

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
  padding: 0.9375rem;
  border-bottom: ${({ $isLast }) => ($isLast ? "none" : "0.0625rem solid var(--gray-500)")};
  gap: 0.9375rem;
  cursor: pointer;
`;

export const Rank = styled.span`
  font-size: var(--font-size-xxl);
  font-weight: bold;
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 3.75rem;  
  height: 5rem;    
  border-radius: 0.3125rem;
  overflow: hidden;
`;

export const StyledImage = styled(Image)`
  width: 100%;  
  object-fit: cover;
  height: 5.375rem;

`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-size: var(--font-size-lg);
  font-weight: bold;
`;

export const Author = styled.p`
  font-size: var(--font-size-base);
  color: var(--gray-500);
  margin-top: -0.4375rem;
`;

export const Tags = styled.p`
  font-size: var(--font-size-footer);
  color: var(--primary-color);
  margin-top: 0.4375rem;
`;

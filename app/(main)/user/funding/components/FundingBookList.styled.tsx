import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FundingCard = styled.div`
  display: flex;
  gap: 1rem;
`;

export const BookImage = styled.div`
  position: relative;
  img {
    object-fit: cover;
    border-radius: 0.625rem;
    width: 6.625rem;
    height: 8.75rem;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Author = styled.span`
  font-size: var(--font-size-footer);
  color: var(--gray-500);
`;

export const Title = styled.h3`
  margin: 0.25rem 0;
`;


export const Amount = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: space-between; 
  width: 100%;
  .progress{
    color : var(--leave-color);
  }
`;

export const Remaining = styled.span`
   font-size: var(--font-size-footer);
  color: var(--gray-500);
`;

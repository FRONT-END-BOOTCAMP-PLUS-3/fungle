import styled from "styled-components";

export const Container = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  padding: 1rem;
  padding-bottom: 5rem;
`;

export const BookImage = styled.div`
  width: 6rem;
  height: 8rem;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #555;
`;

export const Title = styled.h2`
  font-size: var(--font-size-lg)
  margin: 0.5rem 0;
`;

export const Author = styled.p`
  font-size: 0.875rem;
  color: var(--gray-500);
`;

export const Description = styled.p`
  line-height: 1.125rem;
  margin-bottom: 1rem;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: var(--gray-500);
  font-size: 0.9rem;
  cursor: pointer;
`;

export const FundingAmount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 21rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.6rem;
`;

export const AmountContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const NumberText = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--gray-500);
`;

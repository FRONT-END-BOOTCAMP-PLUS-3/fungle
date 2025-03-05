import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  font-family: "Arial", sans-serif;
`;

export const BookImage = styled.div`
  width: 100%;
  width: 96px;
  height: 129px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
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
  line-height: 18px;
  margin-bottom: 17px;
  .body2 {
    margin-bottom: 1rem;
  }
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: #0066cc;
  font-size: 0.9rem;
  cursor: pointer;
`;

export const FundingAmount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--gray-300);
  border-radius: 4px;
  position: relative;
`;

export const Progress = styled.div<{ percent: number }>`
  width: ${(props) => props.percent}%;
  height: 100%;
  background: #000;
  border-radius: 4px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  margin-bottom: 26px;
`;

export const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NumberText = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--gray-500);
`;

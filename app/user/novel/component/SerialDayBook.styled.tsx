import styled from "styled-components";

interface DayProps {
  $active: boolean;
}

export const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem;
  border-bottom: 0.0625rem solid var(--gray-300);
`;

export const Day = styled.button<DayProps>`
  font-weight: bold;
  color: ${({ $active }) => ($active ? "var(--primary-color)" : "var(--gray-900)")};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.625rem;
  position: relative;

  &:after {
    content: "";
    display: ${({ $active }) => ($active ? "var(--gray-900)" : "none")};
    width: 80%;
    height: 0.125rem;
    background: var(--primary-color);
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr)); 
  gap: 0.625rem;
`;

export const Card = styled.div`
  border-radius: 0.625rem;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  text-align: center;

  .thumbnail {
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 0.625rem 0.625rem 0 0;
    overflow: hidden;
  }

  .content{
    padding: 0.625rem;
  }

  .title {
    text-align: center;
    font-weight: bold;
    width: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    font-size: 0.9rem;
    gap: 0.3125rem;
    padding: 0 0.5rem;
  }
`;

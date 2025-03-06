import styled from "styled-components";
import Image from "next/image";

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
    display: ${({ $active }) => ($active ? "block" : "none")};
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

export const BookCard = styled.div`
  border-radius: 0.625rem;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  border-radius: 0.625rem 0.625rem 0 0;
  overflow: hidden;
  height: auto;
`;

export const StyledImage = styled(Image)`
  width: 100%;  
  height: 100%; 
  object-fit: cover;  
`;

export const Content = styled.div`
  padding: 0.625rem;
`;

export const Title = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  font-size: 0.9rem;
  gap: 0.3125rem;
  padding: 0 0.5rem;

  & p {
    margin: 0;
    text-align: left;
    width: 100%;
  }
`;

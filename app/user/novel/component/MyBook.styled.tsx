import styled from "styled-components";
import Image from "next/image";

export const MyBookContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 0.625rem;
  padding-bottom: 0.625rem;
  white-space: nowrap;
  scrollbar-width: thin; 
  scrollbar-color: transparent transparent; 
  min-height: 18.75rem;

  &::-webkit-scrollbar {
    height: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); 
    border-radius: 0.625rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const BookCard = styled.div`
  border-radius: 0.625rem;
  padding: 0.625rem;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 7.5rem;
  max-width: 10rem;
  flex-shrink: 0;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  border-radius: 0.625rem;
  overflow: hidden;
`;

export const StyledImage = styled(Image)`
  width: 100%;  
  height: 100%; 
  object-fit: cover;  
`;

export const Status = styled.span<{ $status: string }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: ${({ $status }) =>
    $status === "completed"
      ? "var(--leave-color)"
      : $status === "paused"
      ? "var(--gray-500)"
      : "var(--success-color)"};
  color: var(--white-color);
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 0.3125rem;
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

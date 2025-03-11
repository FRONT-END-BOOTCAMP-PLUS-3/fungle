import styled, { keyframes } from "styled-components";

interface ProgressBarWrapperProps {
  $size: "thin" | "thick";
}

interface ProgressProps {
  $progress: number;
}


const progressAnimation = (progress: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${progress}%;
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
`;

export const ProgressBarWrapper = styled.div<ProgressBarWrapperProps>`
  width: 100%;
  height: ${({ $size }) => ($size === "thin" ? "0.5rem" : "0.875rem")}; 
  border-radius: 0.3125rem;
  background: var(--gray-300);
  position: relative;
  overflow: hidden;
`;

export const Progress = styled.div<ProgressProps>`
  height: 100%;
  border-radius: 0.3125rem;
  background: var(--primary-color);
  width: ${({ $progress }) => `${$progress}%`}; 
  animation: ${({ $progress }) => progressAnimation($progress)} 2s ease-in-out;
`;

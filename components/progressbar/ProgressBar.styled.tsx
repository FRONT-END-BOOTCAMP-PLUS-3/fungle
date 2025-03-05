import styled from "styled-components";

interface ProgressBarWrapperProps {
  $size: "thin" | "thick";
}

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
`;

export const Progress = styled.div`
  height: 100%;
  border-radius: 0.3125rem;
  background: var(--primary-color);
`;

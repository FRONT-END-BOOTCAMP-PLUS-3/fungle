"use client";

import { ProgressContainer, ProgressBarWrapper, Progress } from "@/components/progressbar/ProgressBar.styled";

interface ProgressBarProps {
  progress: number;
  size?: "thin" | "thick"; 
}

const ProgressBar = ({ progress, size = "thin" }: ProgressBarProps) => {
  return (
    <ProgressContainer>
      <ProgressBarWrapper $size={size}>
        <Progress style={{ width: `${progress}%` }} />
      </ProgressBarWrapper>
    </ProgressContainer>
  );
};

export default ProgressBar;

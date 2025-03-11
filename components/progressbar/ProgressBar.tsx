"use client";

import { ProgressContainer, ProgressBarWrapper, Progress } from "@/components/progressbar/ProgressBar.styled";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  progress: number;
  size?: "thin" | "thick"; 
}

const ProgressBar = ({ progress, size = "thin" }: ProgressBarProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100); 
  }, [progress]);

  return (
    <ProgressContainer>
      <ProgressBarWrapper $size={size}>
        <Progress $progress={animatedProgress} />
      </ProgressBarWrapper>
    </ProgressContainer>
  );
};

export default ProgressBar;

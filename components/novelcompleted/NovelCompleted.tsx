"use client";

import { Greeting, ButtonContainer } from "./NovelCompleted.styled";
import Button from "../button/Button";
import { useRouter } from "next/navigation";

// 을/를 자동 판별 함수
const addJosa = (word: string) => {
  if (!word) return ""; 
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) {
    return `${word}를`; 
  }
  const hasBatchim = (code - 0xac00) % 28 !== 0;
  return hasBatchim ? `${word}을` : `${word}를`;
};

interface NovelCompletedProps {
  title: string;
}

const NovelCompleted = ({ title }: NovelCompletedProps) => {
  const router = useRouter();
  const formattedTitle = addJosa(title);  

  const handleFunding = () => {
    router.push("/user/funding");
  };

  return (
    <div>
      <Greeting>
        이상 지금까지 {formattedTitle} 사랑해주셔서 감사합니다.
      </Greeting>
      <ButtonContainer>
        <Button buttonSize="small" onClick={handleFunding}>
          펀딩하러 가기
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default NovelCompleted;

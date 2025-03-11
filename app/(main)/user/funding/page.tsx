"use client";

import React, { useState } from "react";
import {
  Container,
  BookImage,
  Title,
  Author,
  Description,
  MoreButton,
  ButtonWrapper,
  IntroContainer,
  AmountContainer,
  FundingAmount,
  NumberText,
} from "./Funding.styled";
import Button from "@/components/button/Button";
import {
  ProgressBarWrapper,
  ProgressContainer,
  Progress,
} from "@/components/progressbar/ProgressBar.styled";
import FundingModal from "./components/FundingModal";

const Page = () => {
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const progressValue = 70;

  const description =
    '“자신 없습니다, 물론 못할 자신이요.” 제 잘난 맛에 사는 악마의 재능, 좌완 파이어볼러 이영광, 억울한 학폭 논란에 휩싸이다! "이번 생은 망한 건가?" 다음 생엔 야구를 더 절실히 하겠다는 생각을 한 순간. 고2, 야구부 시절로 회귀했다.';

  const fullDescription =
    '“자신 없습니다, 물론 못할 자신이요.” 제 잘난 맛에 사는 악마의 재능, 좌완 파이어볼러 이영광, 억울한 학폭 논란에 휩싸이다! "이번 생은 망한 건가?" 다음 생엔 야구를 더 절실히 하겠다는 생각을 한 순간. 고2, 야구부 시절로 회귀했다. 어쩌고 저쩌고';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <IntroContainer>
        <BookImage>책 사진</BookImage>
        <Title>책 제목</Title>
        <Author>작가 • 무협/로맨스/어쩌구</Author>
      </IntroContainer>

      <Title>펀딩 소개</Title>
      <Description>
        kk
        {showMore ? fullDescription : description}
        <MoreButton onClick={() => setShowMore(!showMore)}>
          {showMore ? "접기" : "더보기"}
        </MoreButton>
      </Description>

      <Title>모인 금액</Title>
      <AmountContainer>
        <FundingAmount>50,000원</FundingAmount>
        <NumberText className="flex items-center">
          {progressValue}% 달성
        </NumberText>
      </AmountContainer>

      {/* ✅ ProgressBar 적용 */}
      <ProgressContainer>
        <ProgressBarWrapper $size="thick">
          <Progress $progress={progressValue} />
        </ProgressBarWrapper>
      </ProgressContainer>
      <ButtonWrapper>
        <Button buttonSize="big" onClick={openModal}>
          펀딩 진행하기
        </Button>
      </ButtonWrapper>

      <FundingModal isOpen={isModalOpen} onClose={closeModal} />
    </Container>
  );
};

export default Page;

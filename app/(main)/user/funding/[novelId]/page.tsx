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
} from "./FundingIntro.styled";
import Button from "@/components/button/Button";
import {
  ProgressBarWrapper,
  ProgressContainer,
  Progress,
} from "@/components/progressbar/ProgressBar.styled";
import FundingModal from "../components/FundingModal";
// import { loadTossPayments } from "@tosspayments/payment-sdk";

const Page = () => {
  const [showMore, setShowMore] = useState(false);
  const progressValue = 70;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description =
    '“자신 없습니다, 물론 못할 자신이요.” 제 잘난 맛에 사는 악마의 재능, 좌완 파이어볼러 이영광, 억울한 학폭 논란에 휩싸이다! "이번 생은 망한 건가?" 다음 생엔 야구를 더 절실히 하겠다는 생각을 한 순간. 고2, 야구부 시절로 회귀했다.';

  const fullDescription =
    '“자신 없습니다, 물론 못할 자신이요.” 제 잘난 맛에 사는 악마의 재능, 좌완 파이어볼러 이영광, 억울한 학폭 논란에 휩싸이다! "이번 생은 망한 건가?" 다음 생엔 야구를 더 절실히 하겠다는 생각을 한 순간. 고2, 야구부 시절로 회귀했다. 어쩌고 저쩌고';

  // // ✅ 토스 결제 요청 함수
  // const handlePayment = async () => {
  //   try {
  //     const response = await fetch("/api/funding", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         orderId: `TEMP_${Date.now()}`,
  //         amount: 50000,
  //         orderName: "임시 펀딩 결제",
  //         customerName: "홍길동",
  //       }),
  //     });

  //     const data = await response.json();

  //     const tossPayments = await loadTossPayments(
  //       process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
  //     );

  //     tossPayments?.requestPayment("카드", {
  //       amount: data.amount,
  //       orderId: data.orderId,
  //       orderName: data.orderName,
  //       customerName: data.customerName,
  //       successUrl: `${window.location.origin}/user/funding/success`,
  //       failUrl: `${window.location.origin}/user/funding/fail`,
  //     });
  //   } catch (error) {
  //     console.error("결제 요청 중 오류 발생:", error);
  //     alert(
  //       `결제 요청 중 오류가 발생했습니다: ${
  //         error instanceof Error ? error.message : "알 수 없는 오류"
  //       }`
  //     );
  //   }
  // };

  return (
    <Container>
      <IntroContainer>
        <BookImage>책 사진</BookImage>
        <Title>책 제목</Title>
        <Author>작가 • 무협/로맨스/어쩌구</Author>
      </IntroContainer>

      <Title>펀딩 소개</Title>
      <Description>
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

      <ProgressContainer>
        <ProgressBarWrapper $size="thick">
          <Progress $progress={progressValue} />
        </ProgressBarWrapper>
      </ProgressContainer>

      <ButtonWrapper>
        <Button buttonSize="big" onClick={() => setIsModalOpen(true)}>
          펀딩 진행하기
        </Button>
      </ButtonWrapper>
      <FundingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default Page;

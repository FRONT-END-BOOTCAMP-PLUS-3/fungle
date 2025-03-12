"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  Container,
  ImageContainer,
  Title,
  SubTitle,
  Label,
  ButtonRow,
  Amount,
} from "./StartFunding.styled";
import Button from "@/components/button/Button";
import Textarea from "@/components/textarea/Textarea";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import useAuthStore from "@/store/useAuthStore";

const Page: React.FC = (): React.ReactElement => {
  const { novelId } = useParams();
  const [fundingIntro, setFundingIntro] = useState("");
  const router = useRouter();
  const amount = 50000;

  const { user } = useAuthStore();

  const handleStart = async (): Promise<void> => {
    if (!user) {
      alert("유저 정보를 가져오지 못했습니다.");
      return;
    }

    try {
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
      );

      tossPayments?.requestPayment("카드", {
        amount: amount,
        orderId: `order_${Date.now()}`,
        orderName: `${novelId} 펀딩`,
        customerName: user.nickname,
        successUrl: window.location.origin + `/user/funding/success`,
        failUrl: window.location.origin + `/user/funding/fail`,
      });
    } catch (error) {
      console.error("❌ [Client] 결제 요청 중 오류 발생:", error);
      alert(`결제 요청 중 오류가 발생했습니다: ${error}`);
    }
  };

  const handleCancel = (): void => {
    router.back();
  };

  return (
    <Container>
      <ImageContainer>
        <Image
          src="/logo/Landing Logo.svg"
          alt="Robot"
          width={128}
          height={156}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </ImageContainer>

      <Title>
        {user ? `${user.nickname} 작가님` : "유저 정보를 가져오는 중..."}
      </Title>

      <SubTitle>
        소설 <strong>{"{novel.title}"}</strong>의 마지막화가 승인
        처리되었습니다.
        <br />
        완결을 축하드립니다!
        <br />
        이제 크라우드 펀딩을 여실 수 있습니다.
      </SubTitle>

      <Label>목표 금액</Label>
      <Amount>{amount.toLocaleString()}원</Amount>

      <Label>펀딩 소개</Label>
      <Textarea
        placeholder="펀딩에 대한 내용을 입력하세요."
        defaultValue={fundingIntro}
        ariaLabel="펀딩 소개"
        onChange={(e) => setFundingIntro(e.target.value)}
        height="6rem"
        name="fundingIntro"
      />

      <ButtonRow>
        <Button buttonSize="big" onClick={handleStart}>
          펀딩 시작
        </Button>
        <Button buttonSize="big" onClick={handleCancel}>
          취소
        </Button>
      </ButtonRow>
    </Container>
  );
};

export default Page;

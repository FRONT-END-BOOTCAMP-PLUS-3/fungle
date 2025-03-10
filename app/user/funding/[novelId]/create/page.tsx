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
  TextArea,
  ButtonRow,
  StyledButton,
  Amount,
} from "./StartFunding.styled";

export default function CreateFundingPage(): React.ReactElement {
  const { novelId } = useParams();
  const router = useRouter();
  const [fundingIntro, setFundingIntro] = useState("");

  // 고정된 목표 금액 (화면에 "50,000원" 표시)
  const displayedAmount = "50,000원";

  function handleStart(): void {
    // 알림창에는 "50,000원" 그대로 표시
    alert(
      `목표 금액: ${displayedAmount}\n펀딩 소개: ${fundingIntro}\nnovelId: ${novelId}`
    );
    router.push("/");
  }

  function handleCancel(): void {
    router.back();
  }

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

      <Title>{"{user.nickname}"} 작가님</Title>
      <SubTitle>
        소설 <strong>{"{novel.title}"}</strong>의 마지막화가 승인
        처리되었습니다.
        <br />
        완결을 축하드립니다! 이제 크라우드 펀딩을 여실 수 있습니다.
      </SubTitle>

      <Label>목표 금액</Label>
      <Amount>{displayedAmount}</Amount>

      <Label>펀딩 소개</Label>
      <TextArea
        placeholder="펀딩에 대한 내용을 입력하세요."
        value={fundingIntro}
        onChange={(e) => setFundingIntro(e.target.value)}
      />

      <ButtonRow>
        <StyledButton onClick={handleStart}>펀딩 시작</StyledButton>
        <StyledButton $secondary onClick={handleCancel}>
          취소
        </StyledButton>
      </ButtonRow>
    </Container>
  );
}

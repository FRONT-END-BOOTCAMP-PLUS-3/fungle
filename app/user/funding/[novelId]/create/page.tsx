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
  Amount,
} from "./StartFunding.styled";
import Button from "@/components/button/Button";

export default function CreateFundingPage(): React.ReactElement {
  const { novelId } = useParams();
  const router = useRouter();
  const [fundingIntro, setFundingIntro] = useState("");

  function handleStart(): void {
    alert(
      `목표 금액: 50,000원\n펀딩 소개: ${fundingIntro}\nnovelId: ${novelId}`
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
        완결을 축하드립니다!
        <br />
        이제 크라우드 펀딩을 여실 수 있습니다.
      </SubTitle>

      <Label>목표 금액</Label>
      <Amount>50,000원</Amount>

      <Label>펀딩 소개</Label>
      <TextArea
        placeholder="펀딩에 대한 내용을 입력하세요."
        value={fundingIntro}
        onChange={(e) => setFundingIntro(e.target.value)}
      />

      <ButtonRow>
        {/* 펀딩 시작 버튼 */}
        <Button
          buttonSize="big"
          fontSize="medium"
          backgroudColor="primary"
          onClick={handleStart}
        >
          펀딩 시작
        </Button>
        {/* 취소 버튼 */}
        <Button
          buttonSize="big"
          fontSize="medium"
          backgroudColor="white"
          onClick={handleCancel}
        >
          취소
        </Button>
      </ButtonRow>
    </Container>
  );
}

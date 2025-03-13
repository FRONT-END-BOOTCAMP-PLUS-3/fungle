"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import useAuthStore from "@/store/useAuthStore";

const Page: React.FC = (): React.ReactElement => {
  const [fundingIntro, setFundingIntro] = useState("");
  const router = useRouter();
  const { user } = useAuthStore();

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
      <Amount>{Amount.toLocaleString()}원</Amount>

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
        <Button buttonSize="big">펀딩 시작</Button>
        <Button buttonSize="big" onClick={handleCancel}>
          취소
        </Button>
      </ButtonRow>
    </Container>
  );
};

export default Page;

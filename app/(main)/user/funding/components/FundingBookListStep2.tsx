"use client";
import Image from "next/image";
import {  Container, ImageContainer } from "@/app/(main)/user/funding/components/FundingBookListStep2.styled";


const FundingBookListStep2 = () => {
  return (
  <div>
    <Container>
      <ImageContainer>
        <Image src="/image/funding-step2.png" alt="펀딩 2단계" width={200} height={300} />
      </ImageContainer>
      <h2>펀딩 2단계가 존재하지 않습니다</h2>
    </Container>
  </div>
);
};

export default FundingBookListStep2;
 
"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #333;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
`;

const Page = () => {
  const router = useRouter();

  return (
    <Container>
      <Title>403</Title>
      <Message>접근 권한이 없습니다.</Message>
      <Message>관리자 권한이 필요합니다.</Message>
      <Button
        buttonSize="medium"
        fontSize="big"
        onClick={() => router.push("/user/novel")}
      >
        홈으로 돌아가기
      </Button>
    </Container>
  );
};

export default Page;

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { Container, ImageContainer, Text } from "./NovelCreatedCompleted.styled";
import Button from "@/components/button/Button";

const NovelCreateCompleted = () => {
  const router = useRouter(); 

  const handleButtonClick = () => {
    router.push("/user/novel"); 
  };

  return (
    <Container>
      <ImageContainer>
        <Image src="/logo/Landing Logo.svg" alt="landing logo" width={165} height={215} />
      </ImageContainer>
      <Text className="body1">
        소설 작성이 완료되었습니다.
        <br /> 작성한 소설은 관리자 검토 승인 이후 소설이 등록됩니다.
      </Text>
      <Button fontSize="medium" buttonSize="medium" backgroudColor="primary" onClick={handleButtonClick}>
        검토 상태 보러가기
      </Button>
    </Container>
  );
};

export default NovelCreateCompleted;

import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import { ButtonContainer, Container, ImageContainer, Text } from "./FundingCompleted.styled";
import Image from "next/image";

const FundingCompleted = () => {
  const router = useRouter(); 

  const handleNavigate = () => {
    router.push("/user/novel");
  };

  return (
    <Container>
      <ImageContainer>
        <Image src="/image/funding-completed.svg" alt="펀딩 완료" width={250} height={100} />
     </ImageContainer>
     <Text> 
          감사합니다! <br/> 
          펀딩이 성공적으로 완료되었습니다. <br/> 
          "한교동짬뽕"님의 후원이 작가님에게 큰 힘이 됩니다
     </Text>
     <ButtonContainer>
      <Button buttonSize="medium" fontSize="big" onClick={handleNavigate}>
        홈으로 돌아가기
      </Button>
     </ButtonContainer>
    </Container>
  );
};

export default FundingCompleted;

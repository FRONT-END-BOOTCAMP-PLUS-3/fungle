import Image from "next/image";
import { Container, ImageContainer, Text } from "./NovelCreatedCompleted.styled";

const NovelCreateCompleted: React.FC = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src="/logo/Landing Logo.svg" alt="landing logo" width={165} height={215}  />
      </ImageContainer>
      <Text className="body1">소설 작성이 완료되었습니다. 
        <br/> 작성한 소설은 관리자 검토 승인 이후 소설이 등록됩니다.
      </Text>
    </Container>

);
};

export default NovelCreateCompleted;

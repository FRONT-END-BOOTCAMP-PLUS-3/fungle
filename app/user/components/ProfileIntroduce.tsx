import Button from "@/components/button/Button";
import { IntroduceHeader, IntroduceWrapper } from "./ProfileIntroduce.styled";

const ProfileIntroduce = () => {
  return (
    <>
      <IntroduceHeader>
        <h5>소개</h5>
        <Button buttonSize="small">작성하기</Button>
      </IntroduceHeader>
      <IntroduceWrapper>
        <p>
          소개글이 비어있습니다.
          <br />
          나를 나타내는 글을 적어주세요.
        </p>
      </IntroduceWrapper>
    </>
  );
};

export default ProfileIntroduce;

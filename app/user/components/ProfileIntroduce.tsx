import Button from "@/components/button/Button";
import {
  ButtonWrapper,
  IntroduceHeader,
  IntroduceWrapper,
  ModalContentContainer,
} from "./ProfileIntroduce.styled";
import useAuthStore from "@/store/useAuthStore";
import Modal from "@/components/modal/Modal";
import Textarea from "@/components/textarea/Textarea";
import { useModalStore } from "@/store/useModalStore";

const ProfileIntroduce = () => {
  const { user } = useAuthStore();
  const { isOpen, openModal, onClose } = useModalStore();
  const introduce =
    user?.introduce || "소개글이 비어있습니다.\n나를 나타내는 글을 적어주세요.";

  const handleClick = () => {
    openModal();
  };

  return (
    <>
      <IntroduceHeader>
        <h5>소개</h5>
        <Button buttonSize="small" onClick={handleClick}>
          {user?.introduce ? "변경하기" : "작성하기"}
        </Button>
      </IntroduceHeader>
      <IntroduceWrapper>
        <p>{introduce}</p>
      </IntroduceWrapper>
      {isOpen && (
        <Modal>
          <ModalContentContainer>
            <Textarea
              width="100%"
              height="10rem"
              ariaLabel="소개글 작성"
              defaultValue={introduce || undefined}
            />
            <ButtonWrapper>
              <Button backgroudColor="white">취소하기</Button>
              <Button>저장하기</Button>
            </ButtonWrapper>
          </ModalContentContainer>
        </Modal>
      )}
    </>
  );
};

export default ProfileIntroduce;

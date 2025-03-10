import { useState } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";
import {
  CloseModalButton,
  ModalBox,
  ModalContainer,
  ModalContent,
  ModalOverlay,
} from "@/components/modal/Modal.styled";
import {
  ModalButtonWrapper,
  ModalContentContainer,
} from "./UserDeletionModal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const UserDeletionModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (isChecked) onConfirm();
    else alert("체크박스를 확인해주세요.");
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <ModalBox>
          <Image
            src="/logo/FUNGLE_White.svg"
            width={98}
            height={33}
            alt="펀글 로고"
          />
          <CloseModalButton
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <Image
              src="/icon/close_white.svg"
              width={30}
              height={30}
              alt="닫기 버튼"
            />
          </CloseModalButton>
        </ModalBox>
        <ModalContent>
          <ModalContentContainer>
            <p>
              회원 탈퇴를 진행하시겠습니까?
              <br />
              지금까지 연재하셨던 모든 소설은 삭제됩니다.
            </p>
            <label onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              &nbsp;확인했습니다.
            </label>
            <ModalButtonWrapper>
              <Button
                buttonSize="medium"
                backgroudColor="white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChecked(false);
                  onClose();
                }}
              >
                취소
              </Button>
              <Button
                buttonSize="medium"
                backgroudColor="primary"
                onClick={handleConfirm}
                disabled={!isChecked}
              >
                확인
              </Button>
            </ModalButtonWrapper>
          </ModalContentContainer>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

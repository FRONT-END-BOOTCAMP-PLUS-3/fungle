"use client";

import { ReactNode } from "react";
import {
  CloseModalButton,
  ModalBox,
  ModalContainer,
  ModalContent,
  ModalOverlay,
} from "./Modal.styled";
import { useModal } from "./hooks/useModal";
import Image from "next/image";

const Modal = ({ children }: { children: ReactNode }) => {
  const { isOpen, onClose } = useModal();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalBox>
          <Image
            src="/logo/FUNGLE_White.svg"
            width={98}
            height={33}
            alt="펀글 로고"
          />
          <CloseModalButton onClick={onClose}>
            <Image
              src="/icon/close_white.svg"
              width={30}
              height={30}
              alt="닫기 버튼"
            />
          </CloseModalButton>
        </ModalBox>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

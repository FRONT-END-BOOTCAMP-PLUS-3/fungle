"use client";

import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import { useModalStore } from "@/store/useModalStore";
import {
  ButtonWrapper,
  ModalContentWrapper,
} from "../../novel/AdminNovelPage.styled";
import FundingApproveButton from "./FundingApproveButton";
import FundingRejectionButton from "./FundingRejectionButton";

const FundingCheckButton = () => {
  const { isOpen, openModal, onClose } = useModalStore();

  return (
    <>
      <Button buttonSize="small" onClick={openModal}>
        펀딩 검토하러 가기
      </Button>
      {isOpen && (
        <Modal>
          <ModalContentWrapper>
            <p>
              <strong>소설 제목: </strong>
              {"제목"}
            </p>
            <p>
              <strong>작가: </strong>
              {"닉네임"}
            </p>
            <p>
              <strong>펀딩 신청 단계: </strong>
              {"펀딩 단계"}
            </p>
            <p>
              <strong>펀딩 소개: </strong>
              {"펀딩 소개"}
            </p>
            <ButtonWrapper>
              <FundingRejectionButton />
              <FundingApproveButton />
            </ButtonWrapper>
          </ModalContentWrapper>
        </Modal>
      )}
    </>
  );
};

export default FundingCheckButton;

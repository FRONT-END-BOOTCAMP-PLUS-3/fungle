"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CloseButton,
  Description,
  DetailAmount,
  Divider,
  FundingAmount,
  ModalContainer,
  ModalOverlay,
  PayButtonBox,
  StyledInput,
  Title,
} from "./FundingModal.styled";
import { AmountContainer } from "../Funding.styled";
import Button from "@/components/button/Button";

interface FundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function FundingModal(props: FundingModalProps): React.ReactElement | null {
  const { isOpen, onClose } = props;
  const router = useRouter();
  const [additionalAmount, setAdditionalAmount] = useState("");

  if (!isOpen) return null;

  function handleClose(): void {
    onClose();
  }

  function handlePayment(): void {
    // 실제 결제 로직(예: API 호출 등)을 여기에 추가
    alert(`기본 10,000원 + 추가 ${additionalAmount}원 결제 진행`);
    onClose();
    router.push("/"); // 결제 후 이동할 페이지 (예: 메인)
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={handleClose}>✕</CloseButton>

        <Title>펀딩 진행하기</Title>

        <AmountContainer>
          <FundingAmount>10,000원</FundingAmount>
          <Description>(기본 펀딩 금액)</Description>
        </AmountContainer>

        <AmountContainer>
          <DetailAmount>추가 금액 입력</DetailAmount>
          <Description>(생략 가능)</Description>
        </AmountContainer>

        <StyledInput
          type="number"
          placeholder="금액을 입력해주세요."
          value={additionalAmount}
          onChange={(e) => setAdditionalAmount(e.target.value)}
        />

        <Divider />

        <PayButtonBox>
          <Button type="button" buttonSize="big" onClick={handlePayment}>
            결제하기
          </Button>
        </PayButtonBox>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default FundingModal;

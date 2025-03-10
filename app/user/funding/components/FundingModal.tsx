"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CloseButton,
  DesContainer,
  Description,
  Divider,
  FundingAmount,
  ModalContainer,
  ModalOverlay,
  PayButtonBox,
} from "./FundingModal.styled";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";

interface FundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FundingModal: React.FC<FundingModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const router = useRouter();
  const [additionalAmount, setAdditionalAmount] = useState("");

  if (!isOpen) return null;

  const handleClose = () => onClose();

  const handlePayment = () => {
    alert(`기본 10,000원 + 추가 ${additionalAmount}원 결제 진행`);
    onClose();
    router.push("/");
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={handleClose}>✕</CloseButton>
        <h4>펀딩 진행하기</h4>

        <DesContainer>
          <FundingAmount>10,000원</FundingAmount>
          <Description>(기본 펀딩 금액)</Description>
        </DesContainer>

        <DesContainer>
          <p>추가 금액 입력</p>
          <Description>(생략 가능)</Description>
        </DesContainer>

        <Input
          label="추가 금액 입력"
          placeholder="금액을 입력해주세요."
          type="number"
          value={additionalAmount}
          onChange={(e) => setAdditionalAmount(e.target.value)}
          hideLabel
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
};

export default FundingModal;

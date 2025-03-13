"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
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
import { loadTossPayments } from "@tosspayments/payment-sdk";

interface FundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FundingModal: React.FC<FundingModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const [additionalAmount, setAdditionalAmount] = useState("");
  const { novelId } = useParams();
  if (!isOpen) return null;

  const handleClose = () => onClose();
  const handlePayment = async () => {
    const baseAmount = 1;
    const additional = isNaN(Number(additionalAmount))
      ? 0
      : Number(additionalAmount);
    const totalAmount = baseAmount + additional;

    if (totalAmount <= 0) {
      alert("올바른 금액을 입력해주세요!");
      return;
    }

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? "";
    if (!clientKey) {
      alert("결제 시스템 오류: 환경변수를 확인해주세요.");
      return;
    }

    try {
      const tossPayments = await loadTossPayments(clientKey);
      await tossPayments.requestPayment("카드", {
        amount: totalAmount,
        orderId: `order-${Date.now()}`,
        orderName: `${novelId} 소설 펀딩`,
        successUrl: window.location.origin + "/funding/success",
        failUrl: window.location.origin + "/funding/fail",
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
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

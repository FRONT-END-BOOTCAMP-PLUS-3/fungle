"use client";

import { loadTossPayments } from "@tosspayments/payment-sdk";

export default function PaymentButton() {
  const requestPayment = async () => {
    try {
      const response = await fetch("/api/funding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: `TEMP_${Date.now()}`,
          amount: 50000,
          orderName: "임시 펀딩 결제",
          customerName: "홍길동",
        }),
      });

      const data = await response.json();

      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
      );

      tossPayments?.requestPayment("카드", {
        amount: data.amount,
        orderId: data.orderId,
        orderName: data.orderName,
        customerName: data.customerName,
        successUrl: `${window.location.origin}/user/funding/success`,
        failUrl: `${window.location.origin}/user/funding/fail`,
      });
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
      alert(
        `결제 요청 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }
  };

  return <button onClick={requestPayment}>결제하기</button>;
}

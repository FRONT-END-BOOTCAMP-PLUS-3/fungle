"use client";

import { useState } from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import useAuthStore from "@/store/useAuthStore";

export default function PaymentButton() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const requestPayment = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);
      console.log("📩 [Client] 결제 요청 시작 | 사용자 정보:", user);

      const response = await fetch("/api/funding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: `TEMP_${Date.now()}`,
          amount: 50000,
          orderName: "임시 펀딩 결제",
          customerName: user.nickname,
        }),
      });

      const data = await response.json();
      console.log("✅ [Client] 서버 응답 데이터:", data);

      if (!response.ok) {
        console.error("❌ [Client] 결제 요청 실패:", data);
        throw new Error(data.message || "결제 요청 실패");
      }

      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
      );

      tossPayments?.requestPayment("카드", {
        amount: data.amount,
        orderId: data.orderId,
        orderName: data.orderName,
        customerName: data.customerName,
        successUrl: `${window.location.origin}/funding/pay/success?paymentKey=${data.paymentKey}&orderId=${data.orderId}&amount=${data.amount}&customerName=${data.customerName}`,
        failUrl: `${window.location.origin}/funding/pay/fail`,
      });
    } catch (error) {
      console.error("❌ [Client] 결제 요청 중 오류 발생:", error);
      alert(
        `결제 요청 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={requestPayment} disabled={isLoading}>
      {isLoading ? "결제 중..." : "결제하기"}
    </button>
  );
}

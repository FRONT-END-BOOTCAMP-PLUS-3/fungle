"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ useRouter 추가

export default function FundingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  // const customerName = searchParams.get("customerName"); // ✅ 추가

  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!paymentKey || !orderId || !amount) {
        console.log("=== confirmPayment ===");
        console.log(paymentKey, orderId, amount);
        console.error("❌ [Client] 필수 결제 정보가 누락되었습니다.");
        return;
      }

      console.log("📩 [Client] 결제 승인 요청 시작:", {
        paymentKey,
        orderId,
        amount,
      });

      try {
        const response = await fetch("/api/funding/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        const data = await response.json();
        console.log("✅ [Client] 결제 승인 성공:", data);

        setIsConfirmed(true);
      } catch (error) {
        console.error("❌ [Client] 결제 승인 실패:", error);
      }
    };

    confirmPayment();
  }, [paymentKey, orderId, amount]);

  return (
    <div>
      {isConfirmed ? (
        <h1>🎉 결제가 성공적으로 완료되었습니다!</h1>
      ) : (
        <h1>결제 확인 중...</h1>
      )}
      <button onClick={() => router.push("/")}>홈으로 이동</button>
    </div>
  );
}

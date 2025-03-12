"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      alert("결제 정보가 올바르지 않습니다.");
      return;
    }

    // ✅ 결제 승인 요청을 백엔드로 보냄
    fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("결제가 완료되었습니다!");
        } else {
          alert("결제 승인 실패: " + (data.error || "알 수 없는 오류"));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("결제 승인 요청 실패:", error);
        alert("결제 승인 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, [paymentKey, orderId, amount]);

  if (loading) return <h1>결제 승인 중...</h1>;
  return <h1>🎉 결제가 성공적으로 완료되었습니다!</h1>;
}

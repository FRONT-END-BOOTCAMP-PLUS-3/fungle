"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FundingCompleted from "@/app/(main)/user/funding/components/FundingCompleted";
// ✅ 컴포넌트 import

export default function FundingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      console.error("❌ [Client] 필수 결제 정보가 누락되었습니다.");
      router.push("/funding/pay/fail"); // ✅ 결제 실패 페이지로 리다이렉트
    }
  }, [paymentKey, orderId, amount, router]);

  return (
    <>
      <FundingCompleted /> {/* ✅ 결제 완료 컴포넌트 표시 */}
    </>
  );
}

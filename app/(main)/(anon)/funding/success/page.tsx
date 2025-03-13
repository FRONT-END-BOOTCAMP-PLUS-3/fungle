"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FundingCompleted from "@/app/(main)/user/funding/components/FundingCompleted";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      console.error("❌ [Client] 필수 결제 정보가 누락되었습니다.");
      router.push("/funding/pay/fail"); // 결제 실패 페이지로 리다이렉트
    }
  }, [paymentKey, orderId, amount, router]);

  return <FundingCompleted />;
}

export default function FundingSuccessPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

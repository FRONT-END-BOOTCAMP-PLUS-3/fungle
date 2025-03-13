import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount, customerName } = await req.json();

    if (!paymentKey || !orderId || !amount || !customerName) {
      console.error("❌ [API] 필수 값 누락:", {
        paymentKey,
        orderId,
        amount,
        customerName,
      });
      return NextResponse.json(
        { success: false, error: "필수 값이 누락되었습니다." },
        { status: 400 }
      );
    }

    console.log("📩 [API] 결제 승인 요청:", {
      paymentKey,
      orderId,
      amount,
      customerName,
    });

    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.TOSS_SECRET_KEY + ":"
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentKey, orderId, amount }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ [API] 토스 결제 승인 실패:", result);
      return NextResponse.json(
        { success: false, error: result.message || "결제 승인 실패" },
        { status: 400 }
      );
    }

    console.log("✅ [API] 결제 승인 성공:", result);
    return NextResponse.json({ success: true, data: result, customerName });
  } catch (error) {
    console.error("❌ [API] 서버 오류 발생:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "서버 오류 발생",
      },
      { status: 500 }
    );
  }
}

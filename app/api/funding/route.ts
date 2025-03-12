import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await req.json();

    if (!paymentKey || !orderId || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

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

    if (response.ok) {
      return new Response(JSON.stringify({ success: true, data: result }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.message || "결제 승인 실패",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("❌ [API] 서버 오류 발생:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "서버 오류 발생",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

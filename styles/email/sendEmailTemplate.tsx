export function sendEmailTemplate(verificationCode: string): string {
  return `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fungle 이메일 인증</title>
        <style>
          body {
            font-family: 'Pretendard', sans-serif;
            background-color: #f8f9fc;
            margin: 0;
            padding: 0;
            text-align: center;
          }
          .email-container {
            max-width: 500px;
            margin: 40px auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-top: 5px solid #0f62fe;
          }
          .logo {
            width: 150px;
            margin: 20px auto;
          }
          .title {
            font-size: 20px;
            font-weight: bold;
            color: #0f62fe;
          }
          .content {
            font-size: 14px;
            color: #333333;
            line-height: 1.6;
            margin: 20px 0;
          }
          .verification-code {
            display: inline-block;
            background: #0f62fe;
            color: white;
            font-size: 24px;
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 8px;
            margin-top: 20px;
            letter-spacing: 2px;
          }
          .footer {
            font-size: 12px;
            color: #888888;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">

          <div
            style="
              display: inline-block;
              font-family: sans-serif;
              font-size: 28px;
              font-weight: bold;
              color: #0f2d9e;
            "
          >
            FUNGLE
          </div>

          <h2 class="title">이메일 인증 코드 안내</h2>
          <p class="content">
            안녕하세요,<br />
            Fungle 서비스를 이용해주셔서 감사합니다.<br />
            아래의 <strong>인증 코드</strong>를 입력하여 이메일 인증을 완료해주세요.
          </p>
          <div class="verification-code">${verificationCode}</div>
          <p class="content">
            인증 코드는 <strong>5분 동안 유효</strong>합니다.<br />
            문제가 발생한 경우 고객센터로 문의해주세요.
          </p>
          <p class="footer">ⓒ 2024 Fungle. All rights reserved.</p>
        </div>
      </body>
    </html>`;
}

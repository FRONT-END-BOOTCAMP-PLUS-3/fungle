import Header from "@/components/header/Header";
import "./globals.css";
import AuthInitializer from "@/components/authInitializer/AuthInitializer";

export const metadata = {
  title: "Fungle",
  description: "Funding Book Community Service",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>펀글</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="누구나 작가가 될 수 있는 북 커뮤니티"
        />
        <meta name="keywords" content="소설, 펀글, 작가, 작가 커뮤니티" />
        <meta name="author" content="펀글 팀" />
        {/* Open Graph 메타 태그 (페이스북, 카카오, 디스코드 등) */}
        <meta
          property="og:title"
          content="펀글 - 누구나 작가가 될 수 있는 북 커뮤니티"
        />
        <meta
          property="og:description"
          content="지금 바로 작가가 될 수 있습니다.! 지금 함께 사용해보세요."
        />

        <meta property="og:type" content="website" />
        {/* Twitter Card 메타 태그 */}
        <meta
          name="twitter:title"
          content="펀글 - 작가가 될 수 있는 북 커뮤니티"
        />
        <meta
          name="twitter:description"
          content="지금 바로 작가가 될 수 있습니다.! 지금 함께 사용해보세요."
        />
      </head>
      <body>
        <AuthInitializer />
        <div className="container">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

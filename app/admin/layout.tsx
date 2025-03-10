"use client";

import AdminSidebar from "./components/AdminSidebar";
import { AdminLayoutContainer } from "./layout.styled";
import "../globals.css";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>펀글 관리자</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AdminLayoutContainer>
          <AdminSidebar />
          {children}
        </AdminLayoutContainer>
      </body>
    </html>
  );
};

export default AdminLayout;

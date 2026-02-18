"use client";

import { AdminHeader, AdminMain } from "../AdminPage.styled";

const Page = () => {
  return (
    <AdminMain>
      <AdminHeader>
        <h1>커뮤니티 관리</h1>
      </AdminHeader>
      <div
        style={{
          padding: "3rem",
          textAlign: "center",
          color: "var(--gray-500)",
          backgroundColor: "var(--white-color)",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ fontSize: "var(--font-size-lg)", margin: 0 }}>
          커뮤니티 관리 기능은 준비 중입니다.
        </p>
      </div>
    </AdminMain>
  );
};

export default Page;

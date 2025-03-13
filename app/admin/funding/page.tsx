"use client";

import { AdminHeader, AdminMain, Table } from "../AdminPage.styled";

const Page = () => {
  return (
    <AdminMain>
      <AdminHeader>
        <h1>펀딩 관리</h1>
      </AdminHeader>

      <Table>
        <thead>
          <tr>
            <th>작가 ID</th>
            <th>소설 제목</th>
            <th>펀딩 소개</th>
            <th>펀딩 승인</th>
          </tr>
        </thead>
      </Table>
    </AdminMain>
  );
};

export default Page;

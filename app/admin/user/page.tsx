"use client";

import { AdminHeader, AdminMain, Table } from "../AdminPage.styled";

const Page = () => {
  return (
    <AdminMain>
      <AdminHeader>
        <h1>회원 관리</h1>
      </AdminHeader>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>회원 유형</th>
            <th>소개</th>
            <th>프로필 사진</th>
          </tr>
        </thead>
      </Table>
    </AdminMain>
  );
};

export default Page;

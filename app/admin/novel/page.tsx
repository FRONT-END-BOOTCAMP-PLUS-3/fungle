"use client";

import { AdminHeader, Table } from "./AdminNovelPage.styled";

const Page = () => {
  return (
    <>
      <AdminHeader>
        <h2>소설 검토</h2>
        <Table>
          <thead>
            <tr>
              <th>소설 ID</th>
              <th>사용자 ID</th>
              <th>닉네임</th>
              <th>제목</th>
              <th>검토 상태</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </AdminHeader>
    </>
  );
};

export default Page;

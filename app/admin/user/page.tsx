"use client";

import { useEffect, useState } from "react";
import { AdminHeader, AdminMain, Table } from "../AdminPage.styled";
import { FindAllUserDto } from "@/application/usecases/user/dto/FindAllUser";
import Image from "next/image";

const Page = () => {
  const [users, setUsers] = useState<FindAllUserDto[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/user");
        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
        }
        setUsers(data.users);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "사용자 데이터를 가져오는 데 실패했습니다."
        );
      }
    };

    fetchData();
  }, [setUsers]);

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
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userEmail}</td>
                <td>{user.nickname}</td>
                <td>{user.type}</td>
                <td>{user.introduce || "소개가 등록되지 않았습니다."}</td>
                <td>
                  <Image
                    src={user.profileImage || "/image/profile.svg"}
                    alt={`${user.nickname} 프로필 사진`}
                    width={100}
                    height={100}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>{error}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </AdminMain>
  );
};

export default Page;

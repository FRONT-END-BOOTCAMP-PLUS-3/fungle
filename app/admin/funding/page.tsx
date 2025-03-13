"use client";

import { useEffect, useState } from "react";
import { AdminHeader, AdminMain, Table } from "../AdminPage.styled";
import { FindAllFundingWithNovelDto } from "@/application/usecases/funding/dto/FindAllFundingWithNovel";
import FundingCheckButton from "./components/FundingCheckButton";

const Page = () => {
  const [fundings, setFundings] = useState<FindAllFundingWithNovelDto[] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/funding");
        const data = await response.json();

        if (!response.ok) {
          alert(data.message || data.error);
        }

        setFundings(data.fundings);
      } catch (error: unknown) {
        alert(
          error instanceof Error
            ? error.message
            : "데이터를 가져오는 데 실패했습니다."
        );
      }
    };

    fetchData();
  }, [setFundings]);

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
            <th>펀딩 상태</th>
            <th>펀딩 단계</th>
            <th>펀딩 승인</th>
          </tr>
        </thead>
        <tbody>
          {fundings && fundings.length > 0 ? (
            fundings?.map((funding) => (
              <tr key={funding.id}>
                <td>{funding.userId}</td>
                <td>{funding.novelTitle}</td>
                <td>{funding.introduce || "등록된 소설 소개가 없습니다."}</td>
                <td>{funding.isActive ? "펀딩 진행 중" : "승인 대기"}</td>
                <td>{funding.fundingStage}</td>
                <td>
                  {!funding.isActive ? <FundingCheckButton /> : "펀딩 진행 중"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>데이터가 없습니다</td>
            </tr>
          )}
        </tbody>
      </Table>
    </AdminMain>
  );
};

export default Page;

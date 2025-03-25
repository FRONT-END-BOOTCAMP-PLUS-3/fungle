"use client";

import { useEffect, useState } from "react";
import { AdminHeader, AdminMain, TableWrapper } from "../AdminPage.styled";
import { FindAllFundingWithNovelDto } from "@/application/usecases/funding/dto/FindAllFundingWithNovel";
import { useModalStore } from "@/store/useModalStore";
import Button from "@/components/button/Button";
import FundingDetailModal from "./components/FundingDetailModal";
import { FundingTable } from "./AdminFundingPage.styled";
import { useAdminFundingStore } from "@/store/useAdminFundingStore";

const Page = () => {
  const { fundings, setFundings } = useAdminFundingStore();
  const [selectedFunding, setSelectedFunding] =
    useState<FindAllFundingWithNovelDto | null>(null);
  const { isOpen, openModal } = useModalStore();

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

  const handleCheckButtonClick = (f: FindAllFundingWithNovelDto) => {
    setSelectedFunding(f);
    openModal();
  };

  return (
    <AdminMain>
      <AdminHeader>
        <h1>펀딩 관리</h1>
      </AdminHeader>

      <TableWrapper>
        <FundingTable>
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
                  <td>
                    {" "}
                    <div className="introduce">
                      {funding.introduce || "등록된 소설 소개가 없습니다."}
                    </div>
                  </td>
                  <td>{funding.isActive ? "펀딩 진행 중" : "승인 대기"}</td>
                  <td>{funding.fundingStage}</td>
                  <td>
                    {!funding.isActive ? (
                      <Button
                        buttonSize="small"
                        onClick={() => handleCheckButtonClick(funding)}
                      >
                        펀딩 검토하러 가기
                      </Button>
                    ) : (
                      "펀딩 진행 중"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>데이터가 없습니다</td>
              </tr>
            )}
          </tbody>
        </FundingTable>
      </TableWrapper>
      {isOpen && selectedFunding && (
        <FundingDetailModal funding={selectedFunding} />
      )}
    </AdminMain>
  );
};

export default Page;

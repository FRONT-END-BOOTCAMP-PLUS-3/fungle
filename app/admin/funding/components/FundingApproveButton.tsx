"use client";

import { FindAllFundingWithNovelDto } from "@/application/usecases/funding/dto/FindAllFundingWithNovel";
import Button from "@/components/button/Button";
import { useAdminFundingStore } from "@/store/useAdminFundingStore";
import { useModalStore } from "@/store/useModalStore";

interface FundingApproveButtonProps {
  id: number;
}

const FundingApproveButton = ({ id }: FundingApproveButtonProps) => {
  const { onClose } = useModalStore();
  const { setFundings } = useAdminFundingStore();

  const handleApproveButtonClick = async () => {
    try {
      const response = await fetch("/api/admin/funding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "펀딩 상태 변경 중 오류가 발생했습니다.");
        return;
      }

      alert(data.message);
      setFundings((prevFundings: FindAllFundingWithNovelDto[]) => {
        return prevFundings.map((funding: FindAllFundingWithNovelDto) =>
          funding.stageId === id ? { ...funding, isActive: true } : funding
        );
      });
      onClose();
    } catch (error: unknown) {
      alert(
        error instanceof Error
          ? error.message
          : "펀딩 상태 변경 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <Button
      buttonSize="big"
      backgroudColor="primary"
      onClick={handleApproveButtonClick}
    >
      펀딩 승인
    </Button>
  );
};

export default FundingApproveButton;

import Button from "@/components/button/Button";
import { useAdminFundingStore } from "@/store/useAdminFundingStore";
import { useModalStore } from "@/store/useModalStore";

interface FundingRejectionButtonProps {
  id: number;
}

const FundingRejectionButton = ({ id }: FundingRejectionButtonProps) => {
  const { onClose } = useModalStore();
  const { removeFunding } = useAdminFundingStore();

  const handleDeleteButtonClick = async () => {
    const confirmed = confirm("펀딩을 거절하시겠습니까?");

    if (!confirmed) return;

    const response = await fetch("/api/admin/funding/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "펀딩 거절 중 오류가 발생했습니다.");
      return;
    }

    alert(data.message);
    removeFunding(id);
    onClose();
  };

  return (
    <Button
      buttonSize="big"
      backgroudColor="leave"
      onClick={handleDeleteButtonClick}
    >
      펀딩 거절
    </Button>
  );
};

export default FundingRejectionButton;

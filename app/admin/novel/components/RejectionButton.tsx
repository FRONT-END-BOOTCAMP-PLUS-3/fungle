import Button from "@/components/button/Button";
import { useModalStore } from "@/store/useModalStore";

const RejectionButton = ({ episodeId }: { episodeId: number }) => {
  const { onClose } = useModalStore();
  const handleButtonClick = async () => {
    try {
      const response = await fetch(`/api/admin/novel-episode/${episodeId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        onClose();
      } else alert(data.error || "에피소드 삭제에 실패했습니다.");
    } catch {
      alert("에피소드 삭제 중 오류가 발생했습니다.");
    }
  };
  return (
    <Button buttonSize="big" backgroudColor="leave" onClick={handleButtonClick}>
      등록 거절
    </Button>
  );
};

export default RejectionButton;

import Button from "@/components/button/Button";
import { useModalStore } from "@/store/useModalStore";

const FundingRejectionButton = () => {
  const { onClose } = useModalStore();
  return (
    <Button buttonSize="big" backgroudColor="leave" onClick={onClose}>
      펀딩 거절
    </Button>
  );
};

export default FundingRejectionButton;

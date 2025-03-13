import Button from "@/components/button/Button";

const DeleteUserButton = ({
  userId,
  onDeleteSuccess,
}: {
  userId: string;
  onDeleteSuccess: (userId: string) => void;
}) => {
  const handleDeleteClick = async () => {
    const response = await fetch(`/api/admin/user/delete/${userId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "회원 삭제 중 오류가 발생했습니다.");
      return;
    }

    alert(data.message);
    onDeleteSuccess(userId);
  };

  return (
    <div className="button-wrapper">
      <Button
        buttonSize="xsmall"
        backgroudColor="leave"
        onClick={handleDeleteClick}
      >
        삭제
      </Button>
    </div>
  );
};

export default DeleteUserButton;

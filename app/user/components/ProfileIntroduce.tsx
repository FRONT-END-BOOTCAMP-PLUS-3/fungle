import Button from "@/components/button/Button";
import {
  ButtonWrapper,
  IntroduceHeader,
  IntroduceWrapper,
  ModalContentContainer,
} from "./ProfileIntroduce.styled";
import useAuthStore from "@/store/useAuthStore";
import Modal from "@/components/modal/Modal";
import Textarea from "@/components/textarea/Textarea";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";

const ProfileIntroduce = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const { isOpen, openModal, onClose } = useModalStore();
  const introduce =
    user?.introduce || "소개글이 비어있습니다.\n나를 나타내는 글을 적어주세요.";

  const updateIntroduce = async (newIntroduce: string) => {
    try {
      const response = await fetch("/api/user/introduce", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ introduce: newIntroduce }),
        credentials: "include",
      });

      if (response.status === 401) {
        alert("로그인이 필요합니다. 다시 로그인해 주세요.");
        router.replace("/login");
        return null;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "소개글 변경에 실패했습니다.");
      }

      return data.message;
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
      return null;
    }
  };

  const handleIntroduceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newIntroduce = formData.get("introduce") as string;

    if (newIntroduce.trim().length > 200) {
      alert("소개글은 최대 200자까지 작성 가능합니다.");
      return;
    }

    const response = await updateIntroduce(newIntroduce);

    if (response) {
      if (user) {
        setUser({ ...user, introduce: newIntroduce });
        alert(response);
      }
    }
    onClose();
  };

  return (
    <>
      <IntroduceHeader>
        <h5>소개</h5>
        <Button buttonSize="small" onClick={openModal}>
          {user?.introduce ? "변경하기" : "작성하기"}
        </Button>
      </IntroduceHeader>
      <IntroduceWrapper>
        <p>{introduce}</p>
      </IntroduceWrapper>
      {isOpen && (
        <Modal>
          <ModalContentContainer>
            <form onSubmit={handleIntroduceSubmit}>
              <Textarea
                width="100%"
                height="10rem"
                ariaLabel="소개글 작성"
                defaultValue={user?.introduce || ""}
                placeholder="나를 나타낼 수 있는 소개글을 작성해주세요."
                name="introduce"
              />
              <ButtonWrapper>
                <Button type="button" backgroudColor="white" onClick={onClose}>
                  취소하기
                </Button>
                <Button type="submit">저장하기</Button>
              </ButtonWrapper>
            </form>
          </ModalContentContainer>
        </Modal>
      )}
    </>
  );
};

export default ProfileIntroduce;

"use client";

import Input from "@/components/input/Input";
import Textarea from "@/components/textarea/Textarea";
import Button from "@/components/button/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal/Modal";
import { useModalStore } from "@/store/useModalStore";
import { Container, ModalContainer, InputContainer, ButtonContainer } from "@/app/user/novel/serialize/SerializePage.styled";
import NovelCreateCompleted from "../../create/component/NovelCreateCompleted";

const Page = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isOpen, openModal, onClose } = useModalStore();
  const [isChecked, setIsChecked] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    openModal();
  }, [openModal]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    alert("게시되었습니다.");
  };

  const handleModalCancel = () => {
    onClose();
    router.push("/user/novel");
  };

  const handleModalConfirm = () => {
    if (isChecked) {
      setIsConfirmed(true);
      onClose();
    } else {
      alert("확인했습니다를 체크해주세요.");
    }
  };

  return (
    <Container>
      {isOpen && (
        <Modal>
          <ModalContainer>
          <p>
            본 페이지에서는 글 작성 시 자동 저장 및 임시 저장 기능이 제공되지 않습니다.
            따라서 작성 중인 내용을 다른 곳에 백업하시거나, 글 작성 창을 나가지 않도록 유의하시기 바랍니다.
          </p>
          <div className="modal-checkbox">
          <label>
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            &nbsp;예, 확인했습니다.
          </label>
          </div>
          <ButtonContainer>
            <Button fontSize="small" buttonSize="medium" backgroudColor="white" onClick={handleModalCancel}>
              취소
            </Button>
            <Button fontSize="small" buttonSize="medium" backgroudColor="primary" onClick={handleModalConfirm}>
              확인
            </Button>
          </ButtonContainer>
          </ModalContainer>
        </Modal>
      )}

      {isConfirmed && (
        <>
          <InputContainer>
            <Input 
              label="" 
              placeholder="제목을 입력해주세요." 
              value={title} 
              onChange={handleTitleChange} 
            />
          </InputContainer>
          <Textarea 
            ariaLabel="글 작성 칸"
            placeholder="내용을 입력해주세요." 
            defaultValue={content}
            onChange={handleContentChange} 
          />
          <ButtonContainer>
            <Button fontSize="medium" buttonSize="medium" backgroudColor="white" onClick={handleCancel}>
              취소
            </Button>
            <Button fontSize="medium" buttonSize="medium" backgroudColor="primary" onClick={handleSubmit}>
              게시
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default Page; 
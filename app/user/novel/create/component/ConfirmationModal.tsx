// components/ConfirmationModal.tsx

import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import { ModalContainer, ButtonContainer } from "@/app/user/novel/serialize/SerializePage.styled";
import { useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleConfirm = () => {
    if (isChecked) {
      onConfirm();
    } else {
      alert("확인했습니다를 체크해주세요.");
    }
  };

  return (
    isOpen && (
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
            <Button fontSize="small" buttonSize="medium" backgroudColor="white" onClick={onClose}>
              취소
            </Button>
            <Button fontSize="small" buttonSize="medium" backgroudColor="primary" onClick={handleConfirm}>
              확인
            </Button>
          </ButtonContainer>
        </ModalContainer>
      </Modal>
    )
  );
};

export default ConfirmationModal;

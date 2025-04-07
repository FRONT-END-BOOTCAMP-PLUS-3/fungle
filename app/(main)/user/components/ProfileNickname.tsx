import useAuthStore from "@/store/useAuthStore";
import { ErrorMessage } from "./ProfileView.styled";
import {
  InputBox,
  NicknameBox,
  NicknameContainer,
} from "./ProfileNickname.styled";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import { Dispatch, SetStateAction, useState } from "react";
import useNicknameEdit from "./hooks/useNicknameEdit";

interface ProfileNicknameProps {
  nicknameInput: string;
  setNicknameInput: Dispatch<SetStateAction<string>>;
}

const ProfileNickname = ({
  nicknameInput,
  setNicknameInput,
}: ProfileNicknameProps) => {
  const { user, setUser } = useAuthStore.getState();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nicknameError, setNicknameError] = useState<string>("");

  const { mutate: updateNickname } = useNicknameEdit(
    setNicknameError,
    setIsEditing,
    setNicknameInput,
    (updatedNickname: string) => {
      if (user) {
        setUser({ ...user, nickname: updatedNickname });
      }
    },
    (error: Error) => {
      alert(
        error instanceof Error
          ? error.message
          : "닉네임 변경 중 알 수 없는 오류가 발생했습니다."
      );
    }
  );

  // 닉네임 유효성 검사
  const validateNickname = (nickname: string): string | null => {
    if (!/^[a-zA-Z가-힣]{1,6}$/.test(nickname.trim())) {
      return "닉네임은 한글 또는 영어만 사용 가능하며, 1~6자로 입력해주세요.";
    }
    return null;
  };

  const handleEditClick = async () => {
    if (isEditing) {
      // 빈 문자열일 경우 기존 닉네임 유지
      const trimmedNickname = nicknameInput.trim();
      if (trimmedNickname === "" || trimmedNickname === user?.nickname) {
        setNicknameError("");
        setNicknameInput(user?.nickname || "");
        setIsEditing(false);
        return;
      }

      // 닉네임 유효성 검사
      const validationError = validateNickname(trimmedNickname);
      if (validationError) {
        setNicknameError(validationError);
        return;
      }

      updateNickname({ nickname: trimmedNickname });
    } else {
      setIsEditing(true);
    }
  };

  return (
    <NicknameContainer>
      <NicknameBox>
        {isEditing ? (
          <InputBox>
            <Input
              placeholder="닉네임 수정"
              label="닉네임 수정"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              hideLabel
            />
          </InputBox>
        ) : (
          <h5>{nicknameInput}</h5>
        )}
        <Button buttonSize="xsmall" onClick={handleEditClick}>
          {isEditing ? "확인" : "수정"}
        </Button>
      </NicknameBox>
      <ErrorMessage>{nicknameError}</ErrorMessage>
    </NicknameContainer>
  );
};

export default ProfileNickname;

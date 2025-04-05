import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

interface NicknameEditData {
  nickname: string;
}

const fetchNicknameEdit = async (
  newNickname: string,
  setNicknameError: Dispatch<SetStateAction<string>>,
  setIsEditing: Dispatch<SetStateAction<boolean>>
): Promise<string> => {
  const response = await fetch(`/api/user/nickname`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newNickname }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data.type === "DUPLICATE_NICKNAME"
        ? data.error
        : data.error || "닉네임 변경에 실패했습니다.";
    setNicknameError(errorMessage);
    setIsEditing(true);
    throw new Error(errorMessage);
  }

  setNicknameError("");
  return data.nickname;
};

const useNicknameEdit = (
  setNicknameError: Dispatch<SetStateAction<string>>,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
  setNicknameInput: Dispatch<SetStateAction<string>>,
  onSuccess: (nickname: string) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: ({ nickname }: NicknameEditData) =>
      fetchNicknameEdit(nickname, setNicknameError, setIsEditing),
    onSuccess: (nickname: string) => {
      alert("닉네임이 성공적으로 변경되었습니다!");
      setNicknameError("");
      setNicknameInput(nickname);
      setIsEditing(false);
      onSuccess(nickname);
    },
    onError: (error: Error) => {
      setIsEditing(true);
      onError(error);
    },
  });
};

export default useNicknameEdit;

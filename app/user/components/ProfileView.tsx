import Button from "@/components/button/Button";
import {
  ErrorMessage,
  InputBox,
  NicknameBox,
  NicknameContainer,
  ProfileContainer,
  ProfileSection,
} from "./ProfileView.styled";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";

const ProfileView = () => {
  const { user, setUser } = useAuthStore();
  const profileImage = user?.profileImage || "/image/profile.svg";
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nicknameInput, setNicknameInput] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>(profileImage);

  useEffect(() => {
    if (user?.nickname) {
      setNicknameInput(user.nickname);
    }
    if (user?.profileImage) {
      setPreviewImage(user.profileImage);
    }
  }, [user?.nickname, user?.profileImage]);

  // 닉네임 유효성 검사
  const validateNickname = (nickname: string): string | null => {
    if (!/^[a-zA-Z가-힣]{1,6}$/.test(nickname.trim())) {
      return "닉네임은 한글 또는 영어만 사용 가능하며, 1~6자로 입력해주세요.";
    }
    return null;
  };

  const updateNickname = async (newNickname: string) => {
    try {
      const response = await fetch("/api/user/nickname", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, newNickname }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.type === "DUPLICATE_NICKNAME") {
          setNicknameError(data.error);
          return null;
        }
        throw new Error(data.error || "닉네임 변경에 실패했습니다.");
      }

      alert("닉네임이 성공적으로 변경되었습니다!");
      setNicknameError(""); // 닉네임 변경 성공 시 오류 초기화
      setIsEditing(false);

      return data.nickname;
    } catch (error) {
      // 실패 시 null 반환
      if (error instanceof Error) {
        setNicknameError(error.message);
        console.log(nicknameError);
        return null;
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
        return null;
      }
    }
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

      // 조건을 만족할 경우 닉네임 변경 api 호출
      const updatedNickname = await updateNickname(trimmedNickname);
      if (!updatedNickname) {
        return;
      }

      setNicknameInput(updatedNickname);
      // zustand 닉네임 상태 변경
      if (user) {
        setUser({ ...user, nickname: updatedNickname });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    await uploadProfileImage(file);
  };

  const uploadProfileImage = async (file: File) => {
    if (!user) return;

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("profileImage", file);

    try {
      const response = await fetch("/api/user/profile-image", {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "프로필 이미지 변경에 실패했습니다.");
      }

      setUser({ ...user, profileImage: data.profileImage });

      alert("프로필 이미지가 성공적으로 변경되었습니다!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <ProfileSection>
      <ProfileContainer>
        <Image
          src={previewImage}
          alt="프로필 이미지"
          width={100}
          height={100}
        />
        <label htmlFor="image-upload" />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ProfileContainer>
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
    </ProfileSection>
  );
};

export default ProfileView;

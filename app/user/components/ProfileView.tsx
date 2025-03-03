import Button from "@/components/button/Button";
import {
  InputBox,
  NicknameContainer,
  ProfileContainer,
  ProfileSection,
} from "./ProfileView.styled";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";

const ProfileView = () => {
  const { user } = useAuthStore();
  const profileImage = user?.profileImage || "/image/profile.svg";
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nicknameInput, setNicknameInput] = useState<string>("");

  useEffect(() => {
    if (user?.nickname) {
      setNicknameInput(user.nickname);
    }
  }, [user?.nickname]);

  const handleEditClick = () => {
    if (isEditing) {
      // 닉네임 변경 api 호출
      if (nicknameInput === "") {
        alert("닉네임은 비워둘 수 없습니다.");
        return;
      }
      console.log("닉네임 변경: ", nicknameInput);
    }
    setIsEditing(!isEditing);
  };

  return (
    <ProfileSection>
      <ProfileContainer>
        <img src={profileImage} alt="프로필 이미지" />
        <label htmlFor="image-upload" />
        <input id="image-upload" type="file" />
      </ProfileContainer>
      <NicknameContainer>
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
      </NicknameContainer>
    </ProfileSection>
  );
};

export default ProfileView;

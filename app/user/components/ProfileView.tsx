import Button from "@/components/button/Button";
import {
  NicknameContainer,
  ProfileContainer,
  ProfileSection,
} from "./ProfileView.styled";
import useAuthStore from "@/store/useAuthStore";

const ProfileView = () => {
  const { user } = useAuthStore();
  const profileImage = user?.profileImage || "/image/profile.svg";
  const nickname = user?.nickname;

  return (
    <ProfileSection>
      <ProfileContainer>
        <img src={profileImage} alt="프로필 이미지" />
        <label htmlFor="image-upload" />
        <input id="image-upload" type="file" />
      </ProfileContainer>
      <NicknameContainer>
        <h5>{nickname}</h5>
        <Button buttonSize="xsmall">수정</Button>
      </NicknameContainer>
    </ProfileSection>
  );
};

export default ProfileView;

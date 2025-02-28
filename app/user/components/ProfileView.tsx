import Button from "@/components/button/Button";
import {
  NicknameContainer,
  ProfileContainer,
  ProfileSection,
} from "./ProfileView.styled";

const ProfileView = () => {
  return (
    <ProfileSection>
      <ProfileContainer>
        {/* 백엔드 연결 후 사용자 프로필 사진으로 변경 */}
        <img src="/image/profile.svg" />
        <label htmlFor="image-upload" />
        <input id="image-upload" type="file" />
      </ProfileContainer>
      <NicknameContainer>
        {/* 백엔드 연결 후 사용자 닉네임으로 변경 */}
        <h5>한교동짬뽕</h5>
        <Button buttonSize="xsmall">수정</Button>
      </NicknameContainer>
    </ProfileSection>
  );
};

export default ProfileView;

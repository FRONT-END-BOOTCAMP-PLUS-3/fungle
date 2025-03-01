import { InfoBox, InfoSection } from "./ProfileInfo.styled";

const ProfileInfo = () => {
  return (
    <InfoSection>
      {/* 백엔드 연결 후 각 count로 변경 */}
      <InfoBox>
        <h5>내가 쓴 글</h5>
        <p>12</p>
      </InfoBox>
      <InfoBox>
        <h5>내가 쓴 소설</h5>
        <p>2</p>
      </InfoBox>
      <InfoBox>
        <h5>펀딩 금액</h5>
        <p>1,000,000</p>
      </InfoBox>
    </InfoSection>
  );
};

export default ProfileInfo;

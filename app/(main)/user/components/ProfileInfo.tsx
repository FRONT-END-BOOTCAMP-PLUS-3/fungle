import { useEffect, useState } from "react";
import { InfoBox, InfoSection } from "./ProfileInfo.styled";
import { UserStatsDto } from "@/application/usecases/user/dto/UserStats";

const ProfileInfo = () => {
  const [postCount, setPostCount] = useState<number>(0);
  const [novelCount, setNovelCount] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/user/count");

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        const counts: UserStatsDto = data.counts;

        setPostCount(counts.postCount ?? 0);
        setNovelCount(counts.novelCount ?? 0);
      } catch (error: unknown) {
        alert(
          error instanceof Error
            ? error.message
            : "사용자 정보를 가져오는 데 실패했습니다."
        );
        setPostCount(0);
        setNovelCount(0);
      }
    };

    fetchCount();
  }, []);

  return (
    <InfoSection>
      <InfoBox>
        <h5>내가 쓴 글</h5>
        <p>{postCount}</p>
      </InfoBox>
      <InfoBox>
        <h5>내가 쓴 소설</h5>
        <p>{novelCount}</p>
      </InfoBox>
      {/* 펀딩 금액 가져오는 BE 구현 예정 */}
      <InfoBox>
        <h5>펀딩 금액</h5>
        <p>1,000,000</p>
      </InfoBox>
    </InfoSection>
  );
};

export default ProfileInfo;

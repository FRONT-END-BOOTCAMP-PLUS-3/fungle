import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";
import { PostStatsItem } from "./CommunityPostStats.styled";
import Image from "next/image";
import { getPostStats } from "../utils/getPostStats";

const CommunityPostStats = ({
  post,
}: {
  post: PostWithCountAndRecruitmentDto;
}) => {
  return (
    <>
      {getPostStats(post).map(({ id, icon, alt, count }) => (
        <PostStatsItem key={id}>
          <Image src={icon} alt={alt} width={15} height={15} />
          {count}
        </PostStatsItem>
      ))}
    </>
  );
};

export default CommunityPostStats;

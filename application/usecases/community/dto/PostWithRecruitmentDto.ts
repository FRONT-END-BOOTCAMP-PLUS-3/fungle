import { CommunityPost } from "@prisma/client";

export interface PostWithRecruitmentDto extends Omit<CommunityPost, "user"> {
  userNickname: string;
  recruitmentNames: string[];
}

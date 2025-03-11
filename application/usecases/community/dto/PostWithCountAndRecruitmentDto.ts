import { CommunityPost } from "@prisma/client";

export interface PostWithCountAndRecruitmentDto
  extends Omit<CommunityPost, "user"> {
  userNickname: string;
  communityPostLikeCount: number;
  communityCommentCount: number;
  recruitmentNames: string[];
}

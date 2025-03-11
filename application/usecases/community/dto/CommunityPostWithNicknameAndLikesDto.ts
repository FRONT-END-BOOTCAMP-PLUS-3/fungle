import { CommunityPost } from "@prisma/client";

export interface PostWithLikesAndUserNicknameDto extends CommunityPost {
  userNickname?: string;
  likes?: number;
  likedUserId?: string[];
}

import { CommunityComment } from "@prisma/client";

export interface PostDetailCommentsWithUserDto extends CommunityComment {
  userNickname: string;
  profileImage?: string | null;
  likes?: number;

  replies?: number;
}

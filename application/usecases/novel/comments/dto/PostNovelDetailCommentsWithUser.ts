import {  NovelComment } from "@prisma/client";

export interface PostNovelDetailCommentsWithUserDto extends NovelComment {
  userNickname: string;
  profileImage?: string | null;
  likes?: number;
  replies?: number;
  isLiked: boolean;
}

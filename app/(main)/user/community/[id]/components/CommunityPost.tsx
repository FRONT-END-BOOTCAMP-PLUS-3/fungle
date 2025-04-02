"use client";
import type { CommunityPost } from "@prisma/client";
import { Main } from "../CommunityDetailPage.styled";

import CommunityPostContent from "./CommunityPostContent";
import CommentHeader from "@/components/comment/CommentHeader";
import CommunityPostHeaderContainer from "./CommunityPostHeaderContainer";
type CommunityDetailPostType = CommunityPost & {
  userNickname: string;
  likes: number;
  likedUserId: string[];
};
interface CommunityDetailProps {
  post: CommunityDetailPostType;
}

const CommunityPost = ({ post }: CommunityDetailProps) => {
  return (
    <Main>
      <CommunityPostHeaderContainer postDetail={post} />
      <CommunityPostContent postDetail={post} />
      <CommentHeader post={post} />
    </Main>
  );
};

export default CommunityPost;

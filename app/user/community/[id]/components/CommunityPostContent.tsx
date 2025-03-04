"use client";
import { CommunityPost } from "@prisma/client";
import {
  CommunityPostContentSection,
  CommunityPostLikeButtonBox,
  CommunityLikeButton,
} from "./CommunityPostContent.styled";
import Image from "next/image";
import { useState } from "react";

type CommunityPostWithNicknameAndLikes = CommunityPost & {
  userNickname: string;
  likes: number;
};

interface CommunityPostHeaderProps {
  postDetail: CommunityPostWithNicknameAndLikes;
}

const CommunityPostContent = ({ postDetail }: CommunityPostHeaderProps) => {
  const [likes, setLikes] = useState(postDetail.likes);
  const handleLike = async () => {
    try {
      const response = await fetch("/api/community/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: postDetail.id }),
      });

      if (!response.ok) {
        throw new Error("서버 에러");
      }

      const { likeCount } = await response.json();

      setLikes(likeCount);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`좋아요 처리 중 오류 발생: ${error.message}`);
      } else {
        alert("좋아요 처리 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  if (!postDetail) {
    return <main>게시글을 찾을 수 없습니다.</main>;
  }
  return (
    <CommunityPostContentSection>
      <div style={{ whiteSpace: "pre-wrap" }}>{postDetail.content}</div>
      <CommunityPostLikeButtonBox>
        <CommunityLikeButton onClick={handleLike}>
          <Image
            src="/icon/heart.svg"
            alt="좋아요 버튼"
            width={20}
            height={20}
          />
          {likes}
        </CommunityLikeButton>
      </CommunityPostLikeButtonBox>
    </CommunityPostContentSection>
  );
};

export default CommunityPostContent;

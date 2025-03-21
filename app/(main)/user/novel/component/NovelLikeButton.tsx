"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LikeContainer,
  LikeButtonStyled,
  LikeCount,
} from "@/app/(main)/user/novel/component/NovelLikeButton.styled";

interface LikeButtonProps {
  novelId: number;
  initialLikeCount: number;
  initialIsLiked: boolean;
}

const LikeButton = ({ novelId, initialLikeCount,initialIsLiked  }: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const toggleLike = async () => {
    try {
      const response = await fetch(`/api/novel/like`, {
        method: "POST",

        body: JSON.stringify({ novelId }),
      });

      if (response.ok) {
        const { likeCount, isLiked } = await response.json();
        setLiked(isLiked);
        setLikeCount(likeCount);
      } else {
        throw new Error(`서버 연결 실패: ${response.status}`);
      }
    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse JSON response: ${error.message}`);
      }
    }
  };

  return (
    <LikeContainer>
      <LikeButtonStyled onClick={toggleLike}>
        <Image
          src={liked ? "/icon/heart_filled.svg" : "/icon/heart.svg"}
          alt="좋아요"
          width={30}
          height={30}
        />
      </LikeButtonStyled>
      <LikeCount>{likeCount}</LikeCount>
    </LikeContainer>
  );
};

export default LikeButton;

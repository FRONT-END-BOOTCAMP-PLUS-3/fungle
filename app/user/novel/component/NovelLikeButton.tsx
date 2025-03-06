"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LikeContainer,
  LikeButtonStyled,
  LikeCount,
} from "@/app/user/novel/component/NovelLikeButton.styled";

interface LikeButtonProps {
  novelId: number;
  initialLikeCount: number;
}

const LikeButton = ({ novelId, initialLikeCount }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);
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
        console.error("좋아요 요청 실패:", await response.text());
      }
    } catch (error) {
      console.error("좋아요 요청 오류:", error);
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

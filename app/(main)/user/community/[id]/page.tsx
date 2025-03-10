"use client";
import { Main } from "./CommunityDetailPage.styled";

import CommunityPostHeader from "./components/CommunityPostHeader";
import CommunityPostContent from "./components/CommunityPostContent";
import CommentHeader from "@/components/comment/CommentHeader";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "./loading";
import { CommunityPost } from "@prisma/client";
export type CommunityDetailPostType = CommunityPost & {
  userNickname: string;
  likes: number;
  likedUserId: string[];
};
const Page = () => {
  const [post, setPost] = useState<CommunityDetailPostType | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    const fetchDetailPage = async () => {
      try {
        const response = await fetch(`/api/community/${postId}`);

        if (!response.ok) {
          throw new Error(`서버 연결 실패: ${response.status}`);
        }

        const post = await response.json();
        setPost(post);
      } catch (error: unknown) {
        let message = "게시글을 찾는 중 알 수 없는 오류가 발생했습니다.";
        if (error instanceof Error) {
          message = error.message;
        }
        setErrorMessage(message);
      }
    };

    fetchDetailPage();
  }, [postId]);

  return (
    <Main>
      {errorMessage ? (
        <main>{errorMessage}</main>
      ) : !post ? (
        <Loading />
      ) : (
        <>
          <CommunityPostHeader postDetail={post} />
          <CommunityPostContent postDetail={post} />
          <CommentHeader post={post} />
        </>
      )}
    </Main>
  );
};

export default Page;

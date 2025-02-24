"use client";

import { posts } from "../components/CommunityPostList";

import { use } from "react";
import { Main } from "./CommunityDetailPage.styled";
import Input from "@/components/input/Input";

import CommunityPostHeader from "./components/CommunityPostHeader";
import CommunityPostContent from "./components/CommunityPostContent";
import CommunityPostComment from "./components/CommunityPostComment";

interface PageParams {
  params: Promise<{ id: string }>;
}

const Page = ({ params }: PageParams) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <main>게시글을 찾을 수 없습니다.</main>;
  }
  return (
    <Main>
      <CommunityPostHeader post={post} />

      <CommunityPostContent post={post} />

      <section>
        <p>댓글 {post.commentCount}</p>
        <Input
          label="댓글 입력"
          placeholder="댓글을 입력해주세요."
          hideLabel={true}
        />
      </section>

      <CommunityPostComment post={post} />
    </Main>
  );
};

export default Page;

import { posts } from "../components/CommunityPostList";

import { Main } from "./CommunityDetailPage.styled";

import CommunityPostHeader from "./components/CommunityPostHeader";
import CommunityPostContent from "./components/CommunityPostContent";
import CommentCreate from "@/components/comment/CommentCreate";
import Comment from "@/components/comment/Comment";

interface PageParams {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageParams) => {
  const postId = (await params).id;
  const post = posts.find((p) => p.id.toString() === postId);

  if (!post) {
    return <main>게시글을 찾을 수 없습니다.</main>;
  }
  return (
    <Main>
      <CommunityPostHeader post={post} />

      <CommunityPostContent post={post} />

      <CommentCreate post={post} />

      <Comment post={post} />
    </Main>
  );
};

export default Page;

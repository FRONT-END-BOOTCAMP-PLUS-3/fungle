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

  let post;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/community/${postId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    post = await response.json();
  } catch (error: unknown) {
    let errorMessage = "게시글을 찾는 중 알 수 없는 오류가 발생했습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return <main>{errorMessage}</main>;
  }
  return (
    <Main>
      <CommunityPostHeader postDetail={post} />

      <CommunityPostContent postDetail={post} />

      <CommentCreate post={post} />

      <Comment postId={postId} />
    </Main>
  );
};

export default Page;

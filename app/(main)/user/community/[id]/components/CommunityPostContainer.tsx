"use client";
import useCommunityDetail from "../hooks/useCommunityDetail";
import CommunityPost from "./CommunityPost";
import Loading from "../loading";

const CommunityPostContainer = ({ postId }: { postId: string }) => {
  const { data, isLoading, error } = useCommunityDetail(postId);

  if (isLoading) return <Loading />;
  if (error) return <div>게시글을 찾을 수 없습니다.</div>;

  return <CommunityPost post={data} />;
};

export default CommunityPostContainer;

"use client";

import { useQuery } from "@tanstack/react-query";

const fetchCommunityEditPost = async (postId: string) => {
  const response = await fetch(`/api/community/${postId}/edit`);
  if (!response.ok) {
    throw new Error(`서버 연결 실패: ${response.status}`);
  }
  return await response.json();
};

const useCommunityEditPost = (postId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["communityEditPost", postId],
    queryFn: () => fetchCommunityEditPost(postId),
  });

  return { data, isLoading, error };
};

export default useCommunityEditPost;

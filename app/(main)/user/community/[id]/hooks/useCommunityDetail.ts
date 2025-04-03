"use client";

import { useQuery } from "@tanstack/react-query";

const fetchCommunityDetail = async (postId: string) => {
  const response = await fetch(`/api/community/${postId}`);
  if (!response.ok) {
    throw new Error(`서버 연결 실패: ${response.status}`);
  }
  return await response.json();
};

const useCommunityDetail = (postId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["communityDetail", postId],
    queryFn: () => fetchCommunityDetail(postId),
  });

  return { data, isLoading, error };
};

export default useCommunityDetail;

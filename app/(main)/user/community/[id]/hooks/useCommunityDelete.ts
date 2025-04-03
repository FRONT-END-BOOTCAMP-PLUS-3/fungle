"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const deleteCommunityPost = async (postId: number) => {
  const response = await fetch(`/api/community/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("게시글 삭제 실패");
  }

  return await response.json();
};

const useCommunityDelete = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: deleteCommunityPost,
    onSuccess: () => {
      alert("게시글 삭제 성공! 커뮤니티로 이동합니다.");
      router.push("/user/community");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(`삭제 실패: ${error.message}`);
      } else {
        alert("삭제 중 알 수 없는 오류가 발생했습니다.");
      }
    },
  });
};

export default useCommunityDelete;

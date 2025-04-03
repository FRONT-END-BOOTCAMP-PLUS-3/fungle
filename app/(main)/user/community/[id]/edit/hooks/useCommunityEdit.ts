"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface EditData {
  postId: string;
  title: string;
  content: string;
  fields: string[];
}

const fetchCommunityEdit = async ({
  postId,
  title,
  content,
  fields,
}: EditData) => {
  const response = await fetch(`/api/community/${postId}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      fields,
    }),
  });

  if (!response.ok) {
    throw new Error("게시글 수정 실패");
  }
  return await response.json();
};

const useCommunityEdit = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: fetchCommunityEdit,
    onSuccess: (data) => {
      const { postId: updatedPostId } = data;
      alert("게시글이 수정되었습니다.상세 페이지로 이동합니다.");
      router.push(`/user/community/${updatedPostId}`);
    },
  });
};

export default useCommunityEdit;

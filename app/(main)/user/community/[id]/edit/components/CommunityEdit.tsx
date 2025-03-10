"use client";
import { useEffect, useMemo, useState } from "react";
import CommunityPostForm from "../../../components/CommunityPostForm";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "./CommunityEdit.styled";

type PostData = {
  title: string;
  content: string;
  fields: string[];
};
const CommunityEdit = ({ postId }: { postId: string }) => {
  const [postData, setPostData] = useState<PostData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/community/${postId}/edit`);

        if (!response.ok) {
          throw new Error("서버 오류");
        }

        const postData = await response.json();

        setPostData({
          title: postData.title,
          content: postData.content,
          fields: postData.recruitmentNames,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(
            "게시글을 불러오는 중 알 수 없는 오류가 발생했습니다."
          );
        }
      }
    };

    fetchPostData();
  }, [postId]);

  const initialSelectedFields = useMemo(() => {
    return postData?.fields || [];
  }, [postData?.fields]);

  const handleEdit = async (
    title: string,
    content: string,
    fields: string[]
  ) => {
    try {
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

      const { postId: updatedPostId } = await response.json();

      alert("게시글이 수정되었습니다.상세 페이지로 이동합니다.");

      router.push(`/user/community/${updatedPostId}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`게시글 수정 실패 원인: ${error.message}`);
      } else {
        alert("게시글 수정 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      {errorMessage ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : (
        <CommunityPostForm
          mode="edit"
          initalTitle={postData?.title}
          initalContent={postData?.content}
          initalSelectedFields={initialSelectedFields}
          onSubmit={handleEdit}
        />
      )}
    </>
  );
};

export default CommunityEdit;

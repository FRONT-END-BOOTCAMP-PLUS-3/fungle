"use client";
import { useRouter } from "next/navigation";
import CommunityPostForm from "../components/CommunityPostForm";
import { useMemo } from "react";

const Page = () => {
  const router = useRouter();
  const handleCreate = async (
    title: string,
    content: string,
    fields: string[]
  ) => {
    try {
      const response = await fetch("/api/community/create", {
        method: "POST",
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
        throw new Error("생성 실패");
      }

      const { postId } = await response.json();

      alert("게시글이 생성되었습니다.상세 페이지로 이동합니다.");

      router.push(`/user/community/${postId}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`게시글 생성 실패: ${error.message}`);
      } else {
        alert("게시글 생성 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const memoizedSelectedFields = useMemo(() => {
    return [];
  }, []);

  return (
    <CommunityPostForm
      mode="create"
      initalContent={`[팀원 모집 내용 예시]
- 장르 및 주제 :
- 모집 인원 : 
- 모집 분야 : 
- 예상 소요 기간 : 
- 연락 방법(이메일, 카카오 오픈 방) : 
- 모집 내용 :
  
  광고성 게시글 및 폭력, 혐오, 사회 분열을 조장하는 글은 경고 없이 관리자에 의해 삭제됩니다.
      `}
      initalSelectedFields={memoizedSelectedFields}
      onSubmit={handleCreate}
    />
  );
};

export default Page;

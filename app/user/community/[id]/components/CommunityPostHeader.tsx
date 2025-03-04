"use client";
import { CommunityPost } from "@prisma/client";
import MoreOptionsMenu from "../../components/MoreOptionMenu";
import {
  CommunityPostHeaderSection,
  CommunityPostInfo,
  CommunityPostStats,
  CommunityPostCreated,
  CommunityPostview,
  CommunityPostTitle,
} from "./CommunityPostHeader.styled";
import { formatDate } from "@/utils/date/formatDate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorMessage } from "../edit/components/CommunityEdit.styled";

type CommunityPostWithNickname = CommunityPost & {
  userNickname: string;
};

interface CommunityPostHeaderProps {
  postDetail: CommunityPostWithNickname;
}
const CommunityPostHeader = ({ postDetail }: CommunityPostHeaderProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/api/community/${postDetail.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("서버 에러 ");
        }

        const { isDelete } = await response.json();
        if (isDelete) {
          alert("게시글 삭제에 성공하였습니다. 커뮤니티로 이동합니다.");
          router.push("/user/community");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(`게시글 삭제 실패: ${error.message}`);
        }
        setErrorMessage("게시글 삭제 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  if (!postDetail) return null;
  const createdAt = new Date(postDetail.createdAt);

  const createdAtFormatted = formatDate(createdAt);
  return (
    <>
      {errorMessage ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : (
        <CommunityPostHeaderSection>
          <CommunityPostInfo>
            <CommunityPostTitle>{postDetail.title}</CommunityPostTitle>

            <MoreOptionsMenu onDelete={handleDelete} postId={postDetail.id} />
          </CommunityPostInfo>
          <div>
            <p>{postDetail.userNickname}</p>
            <CommunityPostStats>
              <CommunityPostCreated>
                작성일 {createdAtFormatted}
              </CommunityPostCreated>
              <CommunityPostview>조회수 {postDetail.view}</CommunityPostview>
            </CommunityPostStats>
          </div>
        </CommunityPostHeaderSection>
      )}
    </>
  );
};

export default CommunityPostHeader;

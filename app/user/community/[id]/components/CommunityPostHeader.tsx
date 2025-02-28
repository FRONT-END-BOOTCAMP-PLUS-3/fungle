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

type CommunityPostWithNickname = CommunityPost & {
  userNickname: string;
};

interface CommunityPostHeaderProps {
  postDetail: CommunityPostWithNickname;
}
const CommunityPostHeader = ({ postDetail }: CommunityPostHeaderProps) => {
  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      console.log("삭제 기능 호출");
      // API 요청 또는 useCase 실행
    }
  };

  if (!postDetail) return null;
  const createdAt = new Date(postDetail.createdAt);

  const createdAtFormatted = formatDate(createdAt);
  return (
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
  );
};

export default CommunityPostHeader;

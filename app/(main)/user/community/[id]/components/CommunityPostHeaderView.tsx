import { CommunityPost } from "@prisma/client";
import {
  CommunityPostCreated,
  CommunityPostHeaderSection,
  CommunityPostInfo,
  CommunityPostStats,
  CommunityPostTitle,
  CommunityPostview,
} from "./CommunityPostHeader.styled";
import MoreOptionsMenu from "../../components/MoreOptionMenu";

type CommunityPostWithNickname = CommunityPost & {
  userNickname: string;
};

interface CommunityPostHeaderProps {
  postDetail: CommunityPostWithNickname;
  onDelete: () => void;
  userId?: string;
  createdAtFormatted: string;
}
const CommunityPostHeaderView = ({
  postDetail,
  onDelete,
  userId,
  createdAtFormatted,
}: CommunityPostHeaderProps) => {
  return (
    <>
      <CommunityPostHeaderSection>
        <CommunityPostInfo>
          <CommunityPostTitle>{postDetail.title}</CommunityPostTitle>
          {userId === postDetail.userId && (
            <MoreOptionsMenu
              mode="post"
              onDelete={onDelete}
              postId={postDetail.id}
            />
          )}
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
    </>
  );
};

export default CommunityPostHeaderView;

import { CommunityPost } from "@prisma/client";
import {
  CommunityPostContentSection,
  CommunityPostLikeButtonBox,
  CommunityLikeButton,
} from "./CommunityPostContent.styled";
import Image from "next/image";

type CommunityPostWithNicknameAndLikes = CommunityPost & {
  userNickname: string;
  likes: number;
};

interface CommunityPostHeaderProps {
  postDetail: CommunityPostWithNicknameAndLikes;
}

const CommunityPostContent = ({ postDetail }: CommunityPostHeaderProps) => {
  if (!postDetail) {
    return <main>게시글을 찾을 수 없습니다.</main>;
  }
  return (
    <CommunityPostContentSection>
      <div style={{ whiteSpace: "pre-wrap" }}>{postDetail.content}</div>
      <CommunityPostLikeButtonBox>
        <CommunityLikeButton>
          <Image
            src="/icon/heart.svg"
            alt="좋아요 버튼"
            width={20}
            height={20}
          />
          {postDetail.likes}
        </CommunityLikeButton>
      </CommunityPostLikeButtonBox>
    </CommunityPostContentSection>
  );
};

export default CommunityPostContent;

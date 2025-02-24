import {
  CommunityPostContentSection,
  CommunityPostLikeButtonBox,
  CommunityLikeButton,
} from "./CommunityPostContent.styled";
import Image from "next/image";

interface PostsType {
  id: number;
  title: string;
  status: string;
  genre: string;
  author: string;
  content: string;
  time: string;
  likes: number;
  views: number;
  commentCount: number;
  createdAt: string;
}

interface CommunityPostContentProps {
  post: PostsType;
}
const CommunityPostContent = ({ post }: CommunityPostContentProps) => {
  if (!post) {
    return <main>게시글을 찾을 수 없습니다.</main>;
  }
  return (
    <CommunityPostContentSection>
      {post.content}
      <CommunityPostLikeButtonBox>
        <CommunityLikeButton>
          <Image
            src="/icon/heart.svg"
            alt="좋아요 버튼"
            width={20}
            height={20}
          />
          {post.likes}
        </CommunityLikeButton>
      </CommunityPostLikeButtonBox>
    </CommunityPostContentSection>
  );
};

export default CommunityPostContent;

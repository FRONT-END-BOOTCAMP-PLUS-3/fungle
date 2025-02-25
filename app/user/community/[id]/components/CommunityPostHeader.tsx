"use client";
import MoreOptionsMenu from "../../components/MoreOptionMenu";
import {
  CommunityPostHeaderSection,
  CommunityPostInfo,
  CommunityPostStats,
  CommunityPostCreated,
  CommunityPostview,
  CommunityPostTitle,
} from "./CommunityPostHeader.styled";

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

interface CommunityPostHeaderProps {
  post: PostsType;
}

const CommunityPostHeader = ({ post }: CommunityPostHeaderProps) => {
  // const router = useRouter();

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      console.log("삭제 기능 호출");
      // API 요청 또는 useCase 실행
    }
  };
  return (
    <CommunityPostHeaderSection>
      <CommunityPostInfo>
        <CommunityPostTitle>{post.title}</CommunityPostTitle>

        <MoreOptionsMenu onDelete={handleDelete} postId={post.id} />
      </CommunityPostInfo>
      <div>
        <p>{post.author}</p>
        <CommunityPostStats>
          <CommunityPostCreated>작성일 {post.createdAt}</CommunityPostCreated>
          <CommunityPostview>조회수 {post.views}</CommunityPostview>
        </CommunityPostStats>
      </div>
    </CommunityPostHeaderSection>
  );
};

export default CommunityPostHeader;

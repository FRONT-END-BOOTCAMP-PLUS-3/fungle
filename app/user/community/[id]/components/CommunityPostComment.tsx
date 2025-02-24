import Image from "next/image";
import {
  CommunityLikeButton,
  CommunityPostCommentWrapper,
  CommunityPostCommentInfo,
  CommunityPostCommentProfile,
  CommunityPostCommentAutor,
  CommunityPostCommentCreated,
  CommunityPostCommentInfoBox,
  CommunityReply,
  CommunityCommentWrapper,
  CommunityPostContent,
} from "./CommunityPostComment.styled";
import MoreOptionsMenu from "../../components/MoreOptionMenu";
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
const CommunityPostComment = ({ post }: CommunityPostContentProps) => {
  if (!post) {
    return <main>게시글을 찾을 수 없습니다.</main>;
  }
  const handleEdit = () => {
    console.log("수정 기능 호출");
    // 수정 페이지 이동 로직 추가
  };

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      console.log("삭제 기능 호출");
      // API 요청 또는 useCase 실행
    }
  };
  return (
    <CommunityPostCommentWrapper>
      <CommunityPostCommentInfo>
        <CommunityPostCommentInfoBox>
          <CommunityPostCommentProfile></CommunityPostCommentProfile>
          <div>
            <CommunityPostCommentAutor>{post.author}</CommunityPostCommentAutor>
            <CommunityPostCommentCreated>
              2025.02.24 오후 2시 13분
            </CommunityPostCommentCreated>
          </div>
        </CommunityPostCommentInfoBox>

        <MoreOptionsMenu onEdit={handleEdit} onDelete={handleDelete} />
      </CommunityPostCommentInfo>

      <CommunityPostContent>
        댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용
      </CommunityPostContent>
      <CommunityCommentWrapper>
        <CommunityLikeButton>
          <Image
            src="/icon/heart.svg"
            alt="좋아요 버튼"
            width={20}
            height={20}
          />
          {post.likes}
        </CommunityLikeButton>
        <CommunityReply>
          <Image src="/icon/talk.svg" alt="댓글 수" width={20} height={20} />
          {post.likes}
        </CommunityReply>
      </CommunityCommentWrapper>
    </CommunityPostCommentWrapper>
  );
};

export default CommunityPostComment;

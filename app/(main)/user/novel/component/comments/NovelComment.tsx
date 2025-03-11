import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date/formatDate";
import useAuthStore from "@/store/useAuthStore";
import type { NovelComment } from "@prisma/client";
import ReplyComment from "@/app/(main)/user/novel/component/comments/NovelReplyComment";
import MoreOptionsMenu from "@/app/(main)/user/novel/component/comments/NovelCommentMoreOptionsMenu";
import NovelCommentEdit from "@/app/(main)/user/novel/component/comments/NovelCommentEdit";
import {
  CommunityLikeButton as NovelLikeButton,
  CommunityPostCommentWrapper as NovelPostCommentWrapper,
  CommunityPostCommentInfo as NovelPostCommentInfo,
  CommunityPostCommentProfile as NovelPostCommentProfile,
  CommunityPostCommentAutor as NovelPostCommentAutor,
  CommunityPostCommentCreated as NovelPostCommentCreated,
  CommunityPostCommentInfoBox as NovelPostCommentInfoBox,
  CommunityCommentBox as NovelCommentBox,
  CommunityCommentWrapper as NovelCommentWrapper,
  CommunityPostContent as NovelPostContent,
  CommunityReplyButton as NovelReplyButton,
  CommentFlexWrapper,
} from "@/components/comment/Comment.styled";
import Image from "next/image";

type CommentsWithNickname = NovelComment & {
  userNickname: string;
  profileImage: string;
  likes: number;
  replies: number | 0;
  isLiked: boolean;
};

const NovelComment = ({
  episodeId,
  trigger,
  setTrigger,
  novelId,
}: {
  novelId: number;
  episodeId: number;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [comments, setComments] = useState<CommentsWithNickname[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [openReplyBox, setOpenReplyBox] = useState<number | null>(null);

  const { user } = useAuthStore();
  const userId = user?.id;


  useEffect(() => {
    
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/novel/${novelId}/${episodeId}/comments`);
        if (!response.ok) throw new Error("댓글을 불러오는 데 실패했습니다.");
  
        const data = await response.json();
        console.log("📌 서버 응답 데이터:", data);
  
        if (!data.comments || !Array.isArray(data.comments)) {
          throw new Error("서버 응답이 올바르지 않습니다. 예상: 배열");
        }
  
        setComments(data.comments);
        setLoading(false); 
      } catch (error) {
        setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
        setLoading(false); 
      }
    };
  
    fetchComments();
  }, [novelId, episodeId, trigger]);
   
  
  
  const handleConfirmDelete = async (commentId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/api/novel/${novelId}/${episodeId}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("댓글 삭제에 실패했습니다.");
      }

      setTrigger((prev) => !prev);
      alert("댓글이 삭제되었습니다.");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다.");
    }
  };

  const handleLike = async (commentId: number) => {
    try {
      const response = await fetch(`/api/novel/${novelId}/${episodeId}/comments/${commentId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("좋아요 누르기에 실패했습니다.");
      }

      const isLiked = await response.json();

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, isLiked } : comment
        )
      );

      setTrigger((prev) => !prev);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <main>로딩 중...</main>;
  if (error) return <main>{error}</main>;

  return (
    <CommentFlexWrapper>
      {comments
        .filter((comment) => comment.parentId === null)
        .map((comment) => {
          const createdAtFormatted = formatDate(new Date(comment.createdAt));

          return (
            <NovelPostCommentWrapper key={comment.id}>
              {editingCommentId === comment.id ? (
                <NovelCommentEdit
                  setTrigger={setTrigger}
                  commentContent={comment.comment}
                  commentId={comment.id}
                  onCancel={() => setEditingCommentId(null)}
                  novelId={novelId}       
                  episodeId={episodeId} 
                />
              ) : (
                <>
                  <NovelPostCommentInfo>
                    <NovelPostCommentInfoBox>
                      <NovelPostCommentProfile>
                        <Image
                          src={comment.profileImage || "/image/profile.svg"}
                          alt={`${comment.userNickname}님 프로필 사진`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </NovelPostCommentProfile>
                      <div style={{ lineHeight: "1.5" }}>
                        <NovelPostCommentAutor>{comment.userNickname}</NovelPostCommentAutor>
                        <NovelPostCommentCreated>{createdAtFormatted}</NovelPostCommentCreated>
                      </div>
                    </NovelPostCommentInfoBox>

                    {userId === comment.userId && (
                      <MoreOptionsMenu
                        onDelete={() => handleConfirmDelete(comment.id)}
                        onEdit={() => setEditingCommentId(comment.id)}
                        isOwner={true}
                      />
                    )}
                  </NovelPostCommentInfo>

                  <NovelPostContent>{comment.comment}</NovelPostContent>

                  <NovelCommentWrapper>
                    <NovelCommentBox>
                      <NovelLikeButton onClick={() => handleLike(comment.id)}>
                        <img
                          src={comment.isLiked ? "/icon/heart_filled.svg" : "/icon/heart.svg"}
                          alt="좋아요 버튼"
                          width={20}
                          height={20}
                        />
                        {comment.likes} 개
                      </NovelLikeButton>
                    </NovelCommentBox>
                    <NovelReplyButton
                      onClick={() => {
                        setOpenReplyBox((prev) => (prev === comment.id ? null : comment.id));
                      }}
                    >
                      <img
                        src={openReplyBox === comment.id ? "/icon/top_arrow.svg" : "/icon/dropdown_arrow.svg"}
                        alt="답글 화살표"
                        width={15}
                        height={15}
                      />
                      답글 {comment.replies}개
                    </NovelReplyButton>
                  </NovelCommentWrapper>

                  {openReplyBox === comment.id && (
                    <ReplyComment
                      replies={comments.filter((reply) => reply.parentId === comment.id)}
                      parentId={comment.id}
                      episodeId={episodeId}
                      setTrigger={setTrigger}
                      novelId={novelId}
                    />
                  )}
                </>
              )}
            </NovelPostCommentWrapper>
          );
        })}
    </CommentFlexWrapper>
  );
};

export default NovelComment;

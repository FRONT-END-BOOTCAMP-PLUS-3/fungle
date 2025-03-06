"use client";
import Image from "next/image";
import {
  CommunityLikeButton,
  CommunityPostCommentWrapper,
  CommunityPostCommentInfo,
  CommunityPostCommentProfile,
  CommunityPostCommentAutor,
  CommunityPostCommentCreated,
  CommunityPostCommentInfoBox,
  CommunityCommentBox,
  CommunityCommentWrapper,
  CommunityPostContent,
  CommunityReplyButton,
  CommunityPostCommentReply,
  CommentFlexWrapper,
} from "./Comment.styled";

import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date/formatDate";
import { CommunityComment } from "@prisma/client";
import useAuthStore from "@/store/useAuthStore";
import CommunityCommentEdit from "@/app/user/community/components/CommunityCommentEdit";
import MoreOptionsMenu from "@/app/user/community/components/MoreOptionMenu";

type CommentsWithNickname = CommunityComment & {
  userNickname: string;
  profileImage: string;
  likes: number;
  replies: number | 0;
  isLiked: boolean;
};

const Comment = ({
  postId,
  trigger,
  setTrigger,
}: {
  postId: string;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [comments, setComments] = useState<CommentsWithNickname[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { user } = useAuthStore();
  const userId = user?.id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/community/${postId}/comments`);

        if (!response.ok) {
          throw new Error("댓글을 불러오는 데 실패했습니다.");
        }

        const comments = await response.json();

        setComments(comments);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId, trigger]);

  const handleEdit = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleConfirmDelete = async (commentId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/api/community/comment/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("댓글 삭제에 실패했습니다.");
      }

      setTrigger((prev) => !prev);
      alert("댓글이 삭제되었습니다.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  const handleLike = async (commentId: number) => {
    try {
      const response = await fetch(`/api/community/comment/${commentId}/like`, {
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
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <main>로딩 중...</main>;
  }

  if (error) {
    return <main>{error}</main>;
  }

  return (
    <>
      <CommentFlexWrapper>
        {comments.map((comment) => {
          const createdAtDate = new Date(comment.createdAt);
          const createdAtFormatted = formatDate(createdAtDate);

          return (
            <CommunityPostCommentWrapper key={comment.id}>
              {editingCommentId === comment.id ? (
                <CommunityCommentEdit
                  setTrigger={setTrigger}
                  commentContent={comment.comment}
                  commentId={comment.id}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <CommunityPostCommentInfo>
                    <CommunityPostCommentInfoBox>
                      <CommunityPostCommentProfile>
                        <Image
                          src={comment.profileImage}
                          alt={`${comment.userNickname}님 프로필 사진`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </CommunityPostCommentProfile>
                      <div style={{ lineHeight: "1.5" }}>
                        <CommunityPostCommentAutor>
                          {comment.userNickname}
                        </CommunityPostCommentAutor>
                        <CommunityPostCommentCreated>
                          {createdAtFormatted}
                        </CommunityPostCommentCreated>
                      </div>
                    </CommunityPostCommentInfoBox>

                    {userId === comment.userId && (
                      <MoreOptionsMenu
                        mode="comment"
                        onDelete={() => handleConfirmDelete(comment.id)}
                        onEdit={() => handleEdit(comment.id)}
                        isOwner={true}
                      />
                    )}
                  </CommunityPostCommentInfo>

                  <CommunityPostContent key={comment.id}>
                    {comment.comment}
                  </CommunityPostContent>

                  <CommunityCommentWrapper>
                    <CommunityCommentBox>
                      <CommunityLikeButton
                        onClick={() => handleLike(comment.id)}
                      >
                        <Image
                          src={
                            comment.isLiked
                              ? "/icon/heart_filled.svg"
                              : "/icon/heart.svg"
                          }
                          alt="좋아요 버튼"
                          width={20}
                          height={20}
                        />
                        {comment.likes} 개
                      </CommunityLikeButton>
                      <CommunityPostCommentReply>
                        <Image
                          src="/icon/talk.svg"
                          alt="답글 버튼"
                          width={20}
                          height={20}
                        />
                        답글
                      </CommunityPostCommentReply>
                    </CommunityCommentBox>
                    <CommunityReplyButton>
                      <Image
                        src="/icon/dropdown_arrow.svg"
                        alt="답글 화살표"
                        width={15}
                        height={15}
                      />
                      답글 {comment.replies}개
                    </CommunityReplyButton>
                  </CommunityCommentWrapper>
                </>
              )}
            </CommunityPostCommentWrapper>
          );
        })}
      </CommentFlexWrapper>
    </>
  );
};

export default Comment;

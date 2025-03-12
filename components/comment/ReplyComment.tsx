"use client";
import { useState } from "react";
import CommentCreateTextarea from "./CommentCreateTextarea";
import Image from "next/image";
import {
  ReplyCommentProfile,
  ReplyCommentInfo,
  ReplyCommentAuthor,
  ReplyCommentCreated,
  ReplyCommentWrapper,
  ReplyAuthor,
  Author,
  ReplyContainer,
} from "./ReplyComment.styled";
import { formatDate } from "@/utils/date/formatDate";
import Button from "../button/Button";
import { CommunityComment } from "@prisma/client";
import MoreOptionsMenu from "@/app/(main)/user/community/components/MoreOptionMenu";
import useAuthStore from "@/store/useAuthStore";
import CommunityCommentEdit from "@/app/(main)/user/community/components/CommunityCommentEdit";

type CommentsWithNickname = CommunityComment & {
  userNickname: string;
  profileImage: string;
  likes: number;
  replies: number | 0;
  isLiked: boolean;
};

type ReplyCommentPropsType = {
  replies: CommentsWithNickname[];
  parentId: number;
  postId: number;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  postUserId: string;
};

const ReplyComment = ({
  replies,
  parentId,
  postId,
  setTrigger,
  postUserId,
}: ReplyCommentPropsType) => {
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const userId = user?.id;

  const handleConfirmDelete = async (replyId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/api/community/comment/${replyId}`, {
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

  const handleEdit = (replyId: number) => {
    setEditingCommentId(replyId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  if (error) {
    return <main>{error}</main>;
  }

  return (
    <>
      {replies.length > 0 && (
        <ReplyContainer>
          {replies.map((reply) => {
            const createdAtDate = new Date(reply.createdAt);
            const createdAtFormatted = formatDate(createdAtDate);
            return (
              <ReplyCommentWrapper key={reply.id}>
                {editingCommentId === reply.id ? (
                  <CommunityCommentEdit
                    setTrigger={setTrigger}
                    commentContent={reply.comment}
                    commentId={reply.id}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <div style={{ width: "100%" }}>
                    <ReplyCommentInfo>
                      <div style={{ display: "flex", gap: "0.625rem" }}>
                        <ReplyCommentProfile>
                          <Image
                            src={reply.profileImage}
                            alt={`${reply.userNickname}님 프로필 사진`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </ReplyCommentProfile>
                        <div style={{ lineHeight: "1.5" }}>
                          <ReplyCommentAuthor>
                            <p>{reply.userNickname}</p>
                            {reply.userId === postUserId && (
                              <ReplyAuthor>
                                <Author>작성자</Author>
                              </ReplyAuthor>
                            )}
                          </ReplyCommentAuthor>
                          <ReplyCommentCreated>
                            {createdAtFormatted}
                          </ReplyCommentCreated>
                        </div>
                      </div>
                      {userId === reply.userId && (
                        <MoreOptionsMenu
                          mode="comment"
                          onDelete={() => handleConfirmDelete(reply.id)}
                          onEdit={() => handleEdit(reply.id)}
                          isOwner={true}
                        />
                      )}
                    </ReplyCommentInfo>
                    <div>{reply.comment}</div>
                  </div>
                )}
              </ReplyCommentWrapper>
            );
          })}
        </ReplyContainer>
      )}

      <Button buttonSize="big" onClick={() => setShowTextarea((prev) => !prev)}>
        {showTextarea ? "답글 닫기" : "답글 달기"}
      </Button>

      {showTextarea && (
        <CommentCreateTextarea
          isOpenTextarea={true}
          setIsOpenTextarea={() => setShowTextarea(false)}
          postId={postId}
          setTrigger={setTrigger}
          parentId={parentId}
        />
      )}
    </>
  );
};

export default ReplyComment;

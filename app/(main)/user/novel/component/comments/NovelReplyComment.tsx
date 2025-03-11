"use client";
import { useState, useEffect } from "react";
import CommentCreateTextarea from "@/app/(main)/user/novel/component/comments/NovelCommentCreateTextarea";
import Image from "next/image";
import {
  ReplyCommentProfile,
  ReplyCommentInfo,
  ReplyCommentAuthor,
  ReplyCommentCreated,
  ReplyCommentWrapper,
  ReplyAuthor, 
  Autor, 
  ReplyContainer,
} from "@/components/comment/ReplyComment.styled";
import { formatDate } from "@/utils/date/formatDate";
import Button from "@/components/button/Button";
import { NovelComment } from "@prisma/client";
import MoreOptionsMenu from "@/app/(main)/user/novel/component/comments/NovelCommentMoreOptionsMenu";
import useAuthStore from "@/store/useAuthStore";
import NovelCommentEdit from "@/app/(main)/user/novel/component/comments/NovelCommentEdit";

type CommentsWithNickname = NovelComment & {
  userNickname: string;
  profileImage: string;
  likes: number;
  replies: number | 0;
  isLiked: boolean;
};

type ReplyCommentPropsType = {
  replies: CommentsWithNickname[];
  parentId: number;
  episodeId: number;
  novelId: number;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const NovelReplyComment = ({
  replies,
  parentId,
  episodeId,
  setTrigger,
  novelId,
}: ReplyCommentPropsType) => {
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [episodeAuthorId, setEpisodeAuthorId] = useState<string | null>(null); 

  const { user } = useAuthStore();
  const userId = user?.id;


  useEffect(() => {
    const fetchEpisodeAuthor = async () => {
      try {
        const response = await fetch(`/api/novel/${novelId}/${episodeId}/comments`);
        const data = await response.json();
        setEpisodeAuthorId(data.episodeAuthorId);
      } catch (error:unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to parse JSON response: ${error.message}`);
        }
      }
    };

    fetchEpisodeAuthor();
  }, [episodeId , novelId]);

  const handleConfirmDelete = async (replyId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/api/novel/${novelId}/${episodeId}/comments/${replyId}`, {
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
                  <NovelCommentEdit
                    setTrigger={setTrigger}
                    commentContent={reply.comment}
                    commentId={reply.id}
                    onCancel={handleCancelEdit}
                    novelId={novelId}       
                    episodeId={episodeId} 
                  />
                ) : (
                  <div style={{ width: "100%" }}>
                    <ReplyCommentInfo>
                      <div style={{ display: "flex", gap: "0.625rem" }}>
                        <ReplyCommentProfile>
                          <Image
                            src={reply.profileImage || "/image/profile.svg"}
                            alt={`${reply.userNickname}님 프로필 사진`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </ReplyCommentProfile>
                        <div style={{ lineHeight: "1.5" }}>
                          <ReplyCommentAuthor>
                            <p>{reply.userNickname}</p>
                            {reply.userId === episodeAuthorId && ( 
                              <ReplyAuthor>
                                <Autor>작가</Autor>
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
          episodeId={episodeId}
          setTrigger={setTrigger}
          parentId={parentId}
          novelId={novelId}
        />
      )}
    </>
  );
};

export default NovelReplyComment;

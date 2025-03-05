"use client";

import { useEffect, useState } from "react";
import Input from "../input/Input";
import CommentCreateTextarea from "./CommentCreateTextarea";
import { CommentSection, TextareaWrapper } from "./CommentHeader.styled";

const CommentHeader = ({ postId }: { postId: string }) => {
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/community/comment/${postId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("댓글 데이터를 가져오는 데 실패했습니다.");
        }

        setCommentCount(data.count);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setCommentCount(0);
        }
      }
    };
    fetchComments();
  }, [postId]);
  const handleComment = () => {
    setIsOpenTextarea((prev) => !prev);
  };

  return (
    <CommentSection $isExpanded={isOpenTextarea}>
      <p>댓글 {commentCount}</p>
      {isOpenTextarea ? null : (
        <Input
          label="댓글 입력"
          placeholder="댓글을 입력해주세요."
          hideLabel={true}
          onClick={handleComment}
        />
      )}
      <TextareaWrapper $isOpen={isOpenTextarea}>
        <CommentCreateTextarea
          isOpenTextarea={isOpenTextarea}
          setIsOpenTextarea={setIsOpenTextarea}
          postId={postId}
        />
      </TextareaWrapper>
    </CommentSection>
  );
};

export default CommentHeader;

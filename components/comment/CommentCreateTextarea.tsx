"use client";
import Textarea from "../textarea/Textarea";
import Button from "../button/Button";

import { useState } from "react";
import { ButtonWrapper } from "./CommentCreateTextarea.styled";

type CommentCreateTextareaProps = {
  isOpenTextarea: boolean;
  setIsOpenTextarea: React.Dispatch<React.SetStateAction<boolean>>;
  postId: number;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  parentId?: number | null;
};

const CommentCreateTextarea = ({
  isOpenTextarea,
  setIsOpenTextarea,
  postId,
  setTrigger,
  parentId,
}: CommentCreateTextareaProps) => {
  const [comment, setComment] = useState("");

  const fetchCreateComment = async () => {
    try {
      const response = await fetch(`/api/community/comment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          parentId,
        }),
      });

      if (!response.ok) {
        throw new Error("댓글 생성 실패");
      }

      const result = await response.json();

      if (result) {
        alert("댓글이 등록되었습니다.");
        setIsOpenTextarea((prev) => !prev);
        setComment("");
      }

      setTrigger((prev) => !prev);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`댓글 생성 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert("댓글 생성 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleCreateComment = async () => {
    if (!comment) {
      alert("댓글을 입력해주세요.");
      return;
    }

    await fetchCreateComment();
  };

  return (
    <>
      {isOpenTextarea && (
        <>
          <Textarea
            ariaLabel="댓글 입력"
            placeholder={
              parentId ? "답글을 입력해주세요." : "댓글을 입력해주세요."
            }
            height="20vh"
            onChange={(e) => setComment(e.target.value)}
          />
          <ButtonWrapper>
            <Button
              backgroudColor="white"
              type="button"
              buttonSize="small"
              onClick={() => setIsOpenTextarea((prev) => !prev)}
            >
              취소
            </Button>
            <Button
              backgroudColor="primary"
              type="button"
              buttonSize="small"
              onClick={handleCreateComment}
            >
              등록
            </Button>
          </ButtonWrapper>
        </>
      )}
    </>
  );
};

export default CommentCreateTextarea;

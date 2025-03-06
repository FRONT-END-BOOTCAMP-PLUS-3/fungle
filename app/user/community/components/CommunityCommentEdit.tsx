"use client";
import Button from "@/components/button/Button";
import Textarea from "@/components/textarea/Textarea";
import { CommentButtonBox } from "./CommunityCommentEdit.styled";
import { useState } from "react";

const CommunityCommentEdit = ({
  setTrigger,
  commentContent,
  commentId,
  onCancel,
}: {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  commentContent: string;
  commentId: number;
  onCancel: () => void;
}) => {
  const [editComment, setEditComment] = useState<string>(commentContent);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEditComment = async () => {
    if (editComment === commentContent) {
      return alert("수정된 내용이 없습니다.");
    } else if (editComment.trim() === "") {
      return alert("내용을 입력해주세요.");
    }

    try {
      const response = await fetch(`/api/community/comment/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: editComment }),
      });

      if (!response.ok) {
        throw new Error("댓글 수정에 실패했습니다.");
      }

      const result = await response.json();
      if (result.result === true) {
        onCancel();
        setTrigger((prev) => !prev);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <Textarea
        ariaLabel="댓글 수정"
        height="15vh"
        defaultValue={commentContent}
        onChange={(e) => setEditComment(e.target.value)}
      />
      <CommentButtonBox>
        <Button buttonSize="small" backgroudColor="white" onClick={onCancel}>
          취소
        </Button>
        <Button
          buttonSize="small"
          backgroudColor="success"
          onClick={handleEditComment}
        >
          수정
        </Button>
      </CommentButtonBox>
    </>
  );
};

export default CommunityCommentEdit;

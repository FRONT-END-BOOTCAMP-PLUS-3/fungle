"use client";

import { useEffect, useState } from "react";
import Input from "../input/Input";
import CommentCreateTextarea from "./CommentCreateTextarea";
import { CommentSection, TextareaWrapper } from "./CommentHeader.styled";
import Comment from "./Comment";
import { CommunityPost } from "@prisma/client";

type CommunityPostWithNicknameAndLikes = CommunityPost & {
  userNickname: string;
  likes: number;
  likedUserId: string[];
};

interface CommunityPostHeaderProps {
  post: CommunityPostWithNicknameAndLikes;
}
const CommentHeader = ({ post }: CommunityPostHeaderProps) => {
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const fetchCommentsCounts = async () => {
      try {
        const response = await fetch(`/api/community/comment/${post.id}`);
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
    fetchCommentsCounts();
  }, [post.id, trigger]);
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
          postId={post.id}
          setTrigger={setTrigger}
        />
      </TextareaWrapper>

      <Comment
        postId={post.id}
        trigger={trigger}
        setTrigger={setTrigger}
        postUserId={post.userId}
      />
    </CommentSection>
  );
};

export default CommentHeader;

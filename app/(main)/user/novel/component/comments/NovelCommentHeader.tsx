"use client";

import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import CommentCreateTextarea from "@/app/(main)/user/novel/component/comments/NovelCommentCreateTextarea";
import { CommentSection, TextareaWrapper } from "@/components/comment/CommentHeader.styled";
import Comment from "@/app/(main)/user/novel/component/comments/NovelComment";
import { NovelEpisodeDto } from "@/application/usecases/novel/dto/NovelEpisode";

interface NovelCommentHeaderProps {
  episode: NovelEpisodeDto;
}

const NovelCommentHeader = ({ episode }: NovelCommentHeaderProps) => {
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [trigger, setTrigger] = useState(false);

  const novelId = episode.novelId;
  const episodeId = episode.id;

  useEffect(() => {
    const fetchCommentsCounts = async () => {
      try {
        const response = await fetch(`/api/novel/${novelId}/${episodeId}/comments`);
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
  }, [novelId, episodeId, trigger]);

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
          episodeId={episodeId}
          novelId={novelId}
          setTrigger={setTrigger}
        />
      </TextareaWrapper>

      <Comment
        episodeId={episodeId}
        trigger={trigger}
        setTrigger={setTrigger}
        novelId={novelId}
      />
    </CommentSection>
  );
};

export default NovelCommentHeader;

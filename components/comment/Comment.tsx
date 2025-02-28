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
} from "./Comment.styled";
import MoreOptionsMenu from "@/app/user/community/components/MoreOptionMenu";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date/formatDate";
import { CommunityComment } from "@prisma/client";

type CommentsWithNickname = CommunityComment & {
  userNickname: string;
  profileImage: string;
  likes: number;
  replies: number | 0;
};

const Comment = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<CommentsWithNickname[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
  }, [postId]);

  if (loading) {
    return <main>로딩 중...</main>;
  }

  if (error) {
    return <main>{error}</main>;
  }

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      console.log("삭제 기능 호출");
      // API 요청 또는 useCase 실행
    }
  };

  return (
    <>
      {comments.map((comment) => {
        const createdAtDate = new Date(comment.createdAt);
        const createdAtFormatted = formatDate(createdAtDate);

        return (
          <CommunityPostCommentWrapper key={comment.id}>
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

              <MoreOptionsMenu onDelete={handleDelete} />
            </CommunityPostCommentInfo>

            <CommunityPostContent key={comment.id}>
              {comment.comment}
            </CommunityPostContent>

            <CommunityCommentWrapper>
              <CommunityCommentBox>
                <CommunityLikeButton>
                  <Image
                    src="/icon/heart.svg"
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
          </CommunityPostCommentWrapper>
        );
      })}
    </>
  );
};

export default Comment;

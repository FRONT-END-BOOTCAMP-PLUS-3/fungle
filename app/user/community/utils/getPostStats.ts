import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";

export const getPostStats = (
  post: PostWithCountAndRecruitmentDto
): { id: string; icon: string; alt: string; count: number }[] => [
  {
    id: "likes",
    icon: "/icon/heart.svg",
    alt: "좋아요 아이콘",
    count: post.communityPostLikeCount,
  },
  {
    id: "views",
    icon: "/icon/eye.svg",
    alt: "조회수 아이콘",
    count: post.view,
  },
  {
    id: "comments",
    icon: "/icon/talk.svg",
    alt: "댓글 아이콘",
    count: post.communityCommentCount,
  },
];

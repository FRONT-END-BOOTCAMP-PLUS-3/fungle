interface PostStats {
  id: number;
  title: string;
  status: string;
  genre: string;
  author: string;
  content: string;
  time: string;
  likes: number;
  views: number;
  commentCount: number;
}
export const getPostStats = (post: PostStats) => [
  {
    id: "likes",
    icon: "/icon/heart.svg",
    alt: "좋아요 아이콘",
    count: post.likes,
  },
  {
    id: "views",
    icon: "/icon/eye.svg",
    alt: "조회수 아이콘",
    count: post.views,
  },
  {
    id: "comments",
    icon: "/icon/talk.svg",
    alt: "댓글 아이콘",
    count: post.commentCount,
  },
];

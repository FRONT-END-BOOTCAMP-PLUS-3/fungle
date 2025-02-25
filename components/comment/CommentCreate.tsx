"use client";

import Input from "../input/Input";

interface PostsType {
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
  createdAt: string;
}
interface CommunityPostContentProps {
  post: PostsType;
}

const CommentCreate = ({ post }: CommunityPostContentProps) => {
  return (
    <section>
      <p>댓글 {post.commentCount}</p>
      <Input
        label="댓글 입력"
        placeholder="댓글을 입력해주세요."
        hideLabel={true}
      />
    </section>
  );
};

export default CommentCreate;

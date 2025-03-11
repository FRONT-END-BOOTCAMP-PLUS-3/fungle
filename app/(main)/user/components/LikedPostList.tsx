import Link from "next/link";
import {
  ErrorMessage,
  PostAndLikedListWrapper,
} from "./PostAndLikedListWrapper.styled";
import {
  PostBox,
  PostContent,
  PostFooter,
  PostInfo,
  PostRecruitment,
  PostStats,
  PostStatus,
  PostStatusWithNickname,
  PostTime,
  PostUserNickname,
} from "../community/components/CommunityPostList.styled";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { realTimeView } from "../community/utils/realTimeView";
import CommunityPostStats from "../community/components/CommunityPostStats";
import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";

const LikedPostList = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<PostWithCountAndRecruitmentDto[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/community/liked", {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
        } else {
          if (!data.likedPosts || data.likedPosts.length === 0) {
            setError("좋아요를 누른 게시글이 없습니다.");
          } else {
            setPosts(data.likedPosts);
          }
        }
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "게시글을 불러오는 중 오류가 발생했습니다."
        );
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {posts.map((post) => (
        <PostAndLikedListWrapper key={post.id}>
          <Link href={`/user/community/${post.id}`}>
            <PostBox>
              <PostStatusWithNickname>
                <PostStatus status={post.status}>
                  {post.status === "recruiting" ? "모집중" : "모집완료"}
                </PostStatus>
              </PostStatusWithNickname>
              <p>{post.title}</p>
              <PostContent>{post.content}</PostContent>
              {post.recruitmentNames.length > 0 && (
                <PostRecruitment>
                  {post.recruitmentNames
                    .map((name) => {
                      const field = RECRUITMENT_FIELDS.find(
                        (f) => f.value === name
                      );
                      return field ? field.label : name;
                    })
                    .join(", ")}{" "}
                </PostRecruitment>
              )}
              <PostFooter>
                <PostInfo>
                  <PostUserNickname>{post.userNickname}</PostUserNickname>
                  <PostTime>{realTimeView(new Date(post.createdAt))}</PostTime>
                </PostInfo>
                <PostStats>
                  <CommunityPostStats post={post} />
                </PostStats>
              </PostFooter>
            </PostBox>
          </Link>
        </PostAndLikedListWrapper>
      ))}
    </>
  );
};

export default LikedPostList;

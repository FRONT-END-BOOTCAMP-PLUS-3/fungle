import Link from "next/link";
import {
  PostBox,
  PostContent,
  PostFooter,
  PostInfo,
  PostRecruitment,
  PostStatus,
  PostStatusWithNickname,
  PostTime,
  PostUserNickname,
} from "../community/components/CommunityPostList.styled";
import { realTimeView } from "../community/utils/realTimeView";
import {
  NoPosts,
  PostAndLikedListWrapper,
} from "./PostAndLikedListWrapper.styled";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { PostWithRecruitmentDto } from "@/application/usecases/community/dto/PostWithRecruitmentDto";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";

const ProfilePostList = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<PostWithRecruitmentDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/community", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("게시글을 불러오는 데 실패했습니다.");

        const data = await response.json();
        // 시간 내림차순 정렬
        const sortedPosts = data.posts.sort(
          (a: PostWithRecruitmentDto, b: PostWithRecruitmentDto) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchPosts();
  }, [user]);

  if (posts.length === 0) return <NoPosts>작성한 게시글이 없습니다.</NoPosts>;

  return (
    <>
      {posts.map((post: PostWithRecruitmentDto) => (
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
                    .join(", ")}
                </PostRecruitment>
              )}
              <PostFooter>
                <PostInfo>
                  <PostUserNickname>{post.userNickname}</PostUserNickname>
                  <PostTime>{realTimeView(new Date(post.createdAt))}</PostTime>
                </PostInfo>
              </PostFooter>
            </PostBox>
          </Link>
        </PostAndLikedListWrapper>
      ))}
    </>
  );
};

export default ProfilePostList;

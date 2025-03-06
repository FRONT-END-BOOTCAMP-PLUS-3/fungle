import Link from "next/link";
import {
  PostBox,
  PostContent,
  PostInfo,
  PostRecruitment,
  PostStatus,
  PostStatusWithNickname,
  PostTime,
  PostUserNickname,
} from "../community/components/CommunityPostList.styled";
import { realTimeView } from "../community/utils/realTimeView";
import {
  CustomPostFooter,
  NoPosts,
  PostAndLikedListWrapper,
} from "./PostAndLikedListWrapper.styled";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { PostWithRecruitmentDto } from "@/application/usecases/community/dto/PostWithRecruitmentDto";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";
import Button from "@/components/button/Button";

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
        setPosts(data.posts);
      } catch (error) {
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchPosts();
  }, [user]);

  const handleButtonClick = async (e: React.MouseEvent, postId: number) => {
    e.preventDefault();

    const isConfirmed = confirm("상태를 모집 완료로 변경하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const response = await fetch("/api/user/community", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          postId,
        }),
      });

      if (!response.ok) {
        throw new Error("모집 상태 변경에 실패했습니다.");
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, status: "completed" } : post
        )
      );

      const result = await response.json();
      alert(result.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

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
              <CustomPostFooter>
                <PostInfo>
                  <PostUserNickname>{post.userNickname}</PostUserNickname>
                  <PostTime>{realTimeView(new Date(post.createdAt))}</PostTime>
                </PostInfo>
                {post.status === "recruiting" ? (
                  <Button
                    buttonSize="small"
                    onClick={(e) => handleButtonClick(e, post.id)}
                  >
                    모집 완료
                  </Button>
                ) : (
                  ""
                )}
              </CustomPostFooter>
            </PostBox>
          </Link>
        </PostAndLikedListWrapper>
      ))}
    </>
  );
};

export default ProfilePostList;

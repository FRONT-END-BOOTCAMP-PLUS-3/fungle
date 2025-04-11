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
import { realTimeView } from "../community/utils/realTimeView";
import CommunityPostStats from "../community/components/CommunityPostStats";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";
import { useUserLikedPostList } from "./hooks/useUserLikedPostList";

const LikedPostList = () => {
  const { posts, error, isLoading } = useUserLikedPostList();

  if (isLoading) {
    return <div>로딩중</div>;
  } else if (!posts || posts.length === 0) {
    return <ErrorMessage>좋아요를 누른 게시글이 없습니다.</ErrorMessage>;
  }

  if (error) {
    return (
      <ErrorMessage>
        {error instanceof Error
          ? `에러 발생: ${error.message}`
          : "좋아요를 누른 게시글을 가져오는 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요."}
      </ErrorMessage>
    );
  }

  return (
    <>
      {posts &&
        posts.map((post) => (
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
                    <PostTime>
                      {realTimeView(new Date(post.createdAt))}
                    </PostTime>
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

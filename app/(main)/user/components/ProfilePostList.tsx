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
  ErrorMessage,
  NoPosts,
  PostAndLikedListWrapper,
} from "./PostAndLikedListWrapper.styled";
import { PostWithRecruitmentDto } from "@/application/usecases/community/dto/PostWithRecruitmentDto";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";
import Button from "@/components/button/Button";
import { useUserPostList } from "./hooks/useUserPostList";

const ProfilePostList = () => {
  const { posts, error, isLoading, completeRecruitment } = useUserPostList();

  const handleButtonClick = (e: React.MouseEvent, postId: number) => {
    e.preventDefault();
    const isConfirmed = confirm("상태를 모집 완료로 변경하시겠습니까?");
    if (isConfirmed) completeRecruitment(postId);
  };

  if (!posts || posts.length === 0)
    return <NoPosts>작성한 게시글이 없습니다.</NoPosts>;

  if (isLoading) return <div>로딩중</div>;

  return (
    <>
      {error && (
        <ErrorMessage>
          {error instanceof Error
            ? `에러 발생: ${error.message}`
            : "게시글을 가져오는 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요."}
        </ErrorMessage>
      )}
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

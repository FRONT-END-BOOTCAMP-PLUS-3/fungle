import Link from "next/link";
import { PostAndLikedListWrapper } from "./PostAndLikedListWrapper.styled";
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

const LikedPostList = () => {
  return (
    <PostAndLikedListWrapper>
      {/* <PostAndLikedListWrapper key={post.id}> */}
      {/* <Link href={`/user/community/${post.id}`}> */}
      <Link href={`/user/community/1`}>
        <PostBox>
          <PostStatusWithNickname>
            {/* <PostStatus status={post.status}>
                {post.status === "recruiting" ? "모집중" : "모집완료"}
              </PostStatus> */}
            <PostStatus status="recruiting">
              모집중
              {/* {post.status === "recruiting" ? "모집중" : "모집완료"} */}
            </PostStatus>
          </PostStatusWithNickname>
          {/* <p>{post.title}</p> */}
          <p>제목</p>
          {/* <PostContent>{post.content}</PostContent> */}
          <PostContent>내용</PostContent>
          {/* {post.recruitmentNames.length > 0 && (
              <PostRecruitment>
                {post.recruitmentNames.join(", ")}
              </PostRecruitment>
            )} */}
          <PostRecruitment>모집 분야</PostRecruitment>
          <PostFooter>
            <PostInfo>
              {/* <PostUserNickname>{post.userNickname}</PostUserNickname> */}
              <PostUserNickname>한교동짬뽕</PostUserNickname>
              {/* <PostTime>{realTimeView(new Date(post.createdAt))}</PostTime> */}
              <PostTime>시간</PostTime>
            </PostInfo>
            <PostStats>{/* <CommunityPostStats post={post} /> */}</PostStats>
          </PostFooter>
        </PostBox>
      </Link>
    </PostAndLikedListWrapper>
  );
};

export default LikedPostList;

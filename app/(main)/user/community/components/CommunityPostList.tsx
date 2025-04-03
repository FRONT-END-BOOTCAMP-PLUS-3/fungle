"use client";

import Link from "next/link";
import {
  PostBox,
  PostContent,
  PostFooter,
  PostRecruitment,
  PostInfo,
  PostListContainer,
  PostListWrapper,
  PostStatusWithNickname,
  PostStats,
  PostUserNickname,
  PostStatus,
  PostTime,
} from "./CommunityPostList.styled";

import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";
import { realTimeView } from "../utils/realTimeView";
import CommunityPostStats from "./CommunityPostStats";
import CommunityPagination from "./CommunityPagination";
import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";
import { SearchParams } from "../page";
interface CommunityPostListViewProps {
  posts: PostWithCountAndRecruitmentDto[];
  handleChangePage: (page: number) => void;
  searchParams: SearchParams;
  totalPages: number;
  listRef: React.RefObject<HTMLUListElement | null>;
}

const CommunityPostList = ({
  posts,
  handleChangePage,
  searchParams,
  totalPages,
  listRef,
}: CommunityPostListViewProps) => {
  return (
    <>
      <PostListContainer ref={listRef}>
        {posts.map((post) => (
          <PostListWrapper key={post.id}>
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
          </PostListWrapper>
        ))}
      </PostListContainer>
      <CommunityPagination
        currentPage={searchParams.page}
        totalPages={totalPages}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default CommunityPostList;

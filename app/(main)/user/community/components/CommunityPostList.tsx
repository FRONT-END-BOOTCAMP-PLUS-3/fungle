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
  PostList,
  EmptyStateContainer,
} from "./CommunityPostList.styled";
import { realTimeView } from "../utils/realTimeView";
import { useEffect, useRef, useState } from "react";
import CommunityPostStats from "./CommunityPostStats";
import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";
import CommunityPagination from "./CommunityPagination";
import { SearchParams } from "../page";
import Loading from "../loading";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";

interface CommunityPostListProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}
const CommunityPostList = ({
  searchParams,
  setSearchParams,
}: CommunityPostListProps) => {
  const [posts, setPosts] = useState<PostWithCountAndRecruitmentDto[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const hadleChangePage = (newPage: number) => {
    setSearchParams((prev) => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams();

        query.set("filter", searchParams.selectedCommunity || "all");

        query.set("page", searchParams.page.toString());
        if (searchParams.sort && searchParams.sort !== "latest") {
          query.set("sort", searchParams.sort);
        }

        const {
          selectedSearchField,
          searchTitle,
          searchAuthor,
          searchContent,
        } = searchParams;

        if (selectedSearchField) {
          query.set("searchField", selectedSearchField);
        }

        if (selectedSearchField === "title" && searchTitle.trim() !== "") {
          query.set("search", searchTitle.trim());
        } else if (
          selectedSearchField === "author" &&
          searchAuthor.trim() !== ""
        ) {
          query.set("search", searchAuthor.trim());
        } else if (
          selectedSearchField === "content" &&
          searchContent.trim() !== ""
        ) {
          query.set("search", searchContent.trim());
        }

        if (searchParams.searchRecruitment.length > 0) {
          query.set("recruitment", searchParams.searchRecruitment.join(", "));
        }

        const response = await fetch(`/api/community?${query.toString()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts);

        setTotalPages(data.totalPages);
        setIsLoading(false);
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknow Error";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (error) {
    return (
      <EmptyStateContainer>
        <PostList>{error}</PostList>
      </EmptyStateContainer>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (posts.length === 0) {
    return (
      <EmptyStateContainer>
        <PostList>게시글이 없습니다.</PostList>
      </EmptyStateContainer>
    );
  }

  return (
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
                  <PostTime>{realTimeView(new Date(post.createdAt))}</PostTime>
                </PostInfo>
                <PostStats>
                  <CommunityPostStats post={post} />
                </PostStats>
              </PostFooter>
            </PostBox>
          </Link>
        </PostListWrapper>
      ))}

      <CommunityPagination
        currentPage={searchParams.page}
        totalPages={totalPages}
        onPageChange={hadleChangePage}
      />
    </PostListContainer>
  );
};

export default CommunityPostList;

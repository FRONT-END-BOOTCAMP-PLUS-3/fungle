"use client";
import { useRef } from "react";
import useCommunityPosts from "../hooks/useCommunityPosts";
import { SearchParams } from "../page";
import { EmptyStateContainer, PostList } from "./CommunityPostList.styled";
import PostSkeleton from "./skeleton/PostSkeleton";
import CommunityPostList from "./CommunityPostList";

interface CommunityPostListProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

const CommunityPostListContainer = ({
  searchParams,
  setSearchParams,
}: CommunityPostListProps) => {
  const { posts, totalPages, isLoading, error } =
    useCommunityPosts(searchParams);
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === searchParams.page)
      return;

    setSearchParams((prev) => ({ ...prev, page: newPage }));
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (error) {
    return (
      <EmptyStateContainer>
        <PostList>{error}</PostList>
      </EmptyStateContainer>
    );
  }

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <EmptyStateContainer>
        <PostList>게시글이 없습니다.</PostList>
      </EmptyStateContainer>
    );
  }

  const viewModel = {
    posts,
    handleChangePage,
    searchParams,
    totalPages,
    listRef,
  };

  return <CommunityPostList {...viewModel} />;
};

export default CommunityPostListContainer;

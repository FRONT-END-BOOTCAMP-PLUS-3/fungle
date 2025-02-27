"use client";
import { Main } from "./CommunityList.styled";

import CommunitySearchFilter from "./components/CommunitySearchFilter";
import CommunityListFilter from "./components/CommunityListFilter";
import CommunityPostList from "./components/CommunityPostList";
import { useState } from "react";

export interface SearchParams {
  selectedCommunity: string;
  selectedSearchField: string;
  searchTitle: string;
  searchAuthor: string;
  searchContent: string;
  searchRecruitment: string[];
  page: number;
  sort: string;
}

const Page = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    selectedCommunity: "all",
    selectedSearchField: "title",
    searchTitle: "",
    searchAuthor: "",
    searchContent: "",
    searchRecruitment: [],
    page: 1,
    sort: "latest",
  });

  return (
    <Main>
      <CommunitySearchFilter
        onSearch={(newCriteria) => setSearchParams(newCriteria)}
      />
      <CommunityListFilter
        onSortChange={(newSort) =>
          setSearchParams((prev) => ({ ...prev, sort: newSort, page: 1 }))
        }
        selectedSort={searchParams.sort}
      />

      <CommunityPostList
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </Main>
  );
};

export default Page;

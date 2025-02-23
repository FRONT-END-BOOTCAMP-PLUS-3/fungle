"use client";
import { useState } from "react";
import { Main } from "./CommunityList.styled";

import CommunitySearchFilter from "./components/CommunitySearchFilter";
import CommunityListFilter from "./components/CommunityListFilter";
import CommunityPostList from "./components/CommunityPostList";
import CommunityPagination from "./components/CommunityPagination";

const Page = () => {
  const [selectedCommunity, setSelectedCommunity] = useState("all");

  return (
    <Main>
      <CommunitySearchFilter
        selectedCommunity={selectedCommunity}
        setSelectedCommunity={setSelectedCommunity}
      />
      <CommunityListFilter />
      <CommunityPostList selectedCommunity={selectedCommunity} />

      <CommunityPagination />
    </Main>
  );
};

export default Page;

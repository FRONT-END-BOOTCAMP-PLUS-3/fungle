"use client";

import { useState } from "react";
import { Divider, Main, TabContainer, Tab, Content, SearchContainer } from "./FundingList.styled";
import FundingSearch from "./components/FundingSearch";
import { FUNDING_SEARCH } from "@/constants/FUNDING-SEARCH";  
import FundingList  from "./components/FundingBookList";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("전체");

  const [selectedOption, setSelectedOption] = useState(FUNDING_SEARCH[0]);  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim().length === 0) {
      handleClear();
    } else {
      setIsSearching(true);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <Main>
      <TabContainer>
        {["전체", "1단계", "2단계", "3단계"].map((tab) => (
          <Tab
            key={tab}
            $active={selectedTab === tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabContainer>
      <Divider />
      <SearchContainer>
        <FundingSearch
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </SearchContainer>
      <Content>
        {selectedTab === "전체" && <FundingList />}
        {selectedTab === "1단계" && <div>1단계 내용</div>}
        {selectedTab === "2단계" && <div>2단계 내용</div>}
        {selectedTab === "3단계" && <div>3단계 내용</div>}
      </Content>

    </Main>
  );
};

export default Page;


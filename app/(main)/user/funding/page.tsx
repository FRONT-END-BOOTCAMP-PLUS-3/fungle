"use client";

import { useState } from "react";
import { Divider, Main, TabContainer, Tab, Content, SearchContainer } from "./FundingList.styled";
import FundingSearch from "./components/FundingSearch";
import { FUNDING_SEARCH } from "@/constants/FUNDING_SEARCH";  
import FundingBookListAll from "./components/FundingBookListAll";
import FundingBookListStep1 from "./components/FundingBookListStep1";
import FundingBookListStep2 from "./components/FundingBookListStep2";
import FundingBookListStep3 from "./components/FundingBookListStep3";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("전체");
  const [selectedOption, setSelectedOption] = useState(FUNDING_SEARCH[0]);  
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim().length === 0) {
      handleClear();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
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
        {selectedTab === "전체" && <FundingBookListAll />}
        {selectedTab === "1단계" && <FundingBookListStep1 />}
        {selectedTab === "2단계" && <FundingBookListStep2 />}
        {selectedTab === "3단계" && <FundingBookListStep3 />}
      </Content>
    </Main>
  );
};

export default Page;

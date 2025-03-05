"use client";

import BannerCarousel from "@/app/user/novel/component/BannerCarousel";
import MyBook from "@/app/user/novel/component/MyBook";
import { useState } from "react";
import { Container, SectionTitle } from "@/app/user/novel/NovelPage.styled";
import SearchBook from "@/app/user/novel/component/SearchBook";
import SerialDayBook from "@/app/user/novel/component/SerialDayBook";
import Top10List from "@/app/user/novel/component/Top10";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("genre");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<string>("수"); 

  return (
    <Container>

      <BannerCarousel />

      <SectionTitle>Top 10</SectionTitle>
      <Top10List />

      <SearchBook 
        selectedOption={selectedOption} 
        setSelectedOption={setSelectedOption} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <SectionTitle>요일별 연재</SectionTitle>
      <SerialDayBook selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      
    </Container>
  );
};

export default Page;

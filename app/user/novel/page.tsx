"use client";

import BannerCarousel from "@/app/user/novel/component/BannerCarousel";
import MyBook from "@/app/user/novel/component/MyBook";
import { useState } from "react";
import { Container, SectionTitle } from "@/app/user/novel/NovelPage.styled";
import SearchBook from "@/app/user/novel/component/SearchBook";
import SerialDayBook from "@/app/user/novel/component/SerialDayBook";
import Top10List from "@/app/user/novel/component/Top10";
import FloatingButton from "./component/FloatingButton";

const Page = () => {
  const getTodayKoreanDay = (): string => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[new Date().getDay()];
  };
  const [selectedOption, setSelectedOption] = useState("genre");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<string>(getTodayKoreanDay()); 


  return (
    <Container>

      <BannerCarousel />

      <SectionTitle>내가 쓴 글</SectionTitle>
      <MyBook />

      <SearchBook 
        selectedOption={selectedOption} 
        setSelectedOption={setSelectedOption} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <SectionTitle>요일별 연재</SectionTitle>
      <SerialDayBook selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <SectionTitle>Top 10</SectionTitle>
      <Top10List />

      <FloatingButton />
      
    </Container>
  );
};

export default Page;

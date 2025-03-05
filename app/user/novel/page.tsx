"use client";

import BannerCarousel from "@/app/user/novel/component/BannerCarousel";
import MyBook from "@/app/user/novel/component/MyBook";
import { useState } from "react";
import { Container, SectionTitle } from "@/app/user/novel/NovelPage.styled";
import FilterComponent from "@/app/user/novel/component/SearchBook";
import DaysComponent from "@/app/user/novel/component/SerialDay";
import Top10List from "@/app/user/novel/component/Top10";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<string>("수"); 

  return (
    <Container>
      <BannerCarousel />
      <MyBook />
      <FilterComponent 
        selectedOption={selectedOption} 
        setSelectedOption={setSelectedOption} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <DaysComponent selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <Top10List />
    </Container>
  );
};

export default Page;

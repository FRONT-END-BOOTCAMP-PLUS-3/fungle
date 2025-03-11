"use client";

import { useState } from "react";
import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import {
  FilterContainer,
  DropdownWrapper,
  SearchWrapper,
  InputWrapper,
  SearchIcon,
} from "@/app/(main)/user/novel/component/SearchBook.styled";
import { SEARCH_OPTIONS } from "@/constants/SEARCH_OPTIONS";
import { mapKoreanToGenreValue } from "@/constants/GENRES";
import Image from "next/image";
import { SearchNovelDTO } from "@/application/usecases/novel/dto/SearchNovel";

interface FilterProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setSearchResults: (results: SearchNovelDTO[]) => void;
  setIsSearching: (value: boolean) => void;
}

const SearchBook = ({
  selectedOption,
  setSelectedOption,
  searchQuery,
  setSearchQuery,
  setSearchResults,
  setIsSearching,
}: FilterProps) => {
  const [isSearchingNow, setIsSearchingNow] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      setIsSearchingNow(false);
      return;
    }

    let queryToSearch = searchQuery;

    if (selectedOption === "genre") {
      const genreValue = mapKoreanToGenreValue(searchQuery);
      if (!genreValue) {
        setSearchResults([]);
        setIsSearching(false);
        setIsSearchingNow(false);
        return;
      }
      queryToSearch = genreValue;
    }

    try {
      const response = await fetch(
        `/api/novel/search?search=${queryToSearch}&filter=${selectedOption}`
      );
      const data = await response.json();
      setSearchResults(data.novels);
      setIsSearching(true);
      setIsSearchingNow(true);
    } catch (error) {
      throw new Error("서버 에러");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
    setIsSearchingNow(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <FilterContainer>
      <DropdownWrapper>
        <Dropdown
          options={SEARCH_OPTIONS}
          onSelect={setSelectedOption}
          selected={selectedOption}
        />
      </DropdownWrapper>
      <SearchWrapper>
        <InputWrapper>
          <Input
            label=""
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon
            onClick={isSearchingNow ? handleClearSearch : handleSearch}
          >
            <Image
              src={isSearchingNow ? "/icon/close.svg" : "/icon/search.svg"}
              alt={isSearchingNow ? "닫기" : "검색"}
              width={20}
              height={20}
            />
          </SearchIcon>
        </InputWrapper>
      </SearchWrapper>
    </FilterContainer>
  );
};

export default SearchBook;

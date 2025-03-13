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
import { FUNDING_SEARCH } from "@/constants/FUNDING_SEARCH";
import Image from "next/image";

interface FilterProps {
  selectedOption: { value: string; label: string };
  setSelectedOption: (value: { value: string; label: string }) => void; 
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

const FundingSearch = ({
  selectedOption,
  setSelectedOption,
  searchQuery,
  setSearchQuery,
  onSearch,
  onClear,
}: FilterProps) => {
  const [isSearchingNow, setIsSearchingNow] = useState(false);

  const defaultOption = FUNDING_SEARCH.find((option) => option.value === "title") || FUNDING_SEARCH[0];

  const handleSearch = () => {
    if (searchQuery.trim().length === 0) {
      onClear();
      setIsSearchingNow(false);
    } else {
      onSearch();
      setIsSearchingNow(true);
    }
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
          options={FUNDING_SEARCH}
          onSelect={(value) => {
            const selected = FUNDING_SEARCH.find((option) => option.value === value);
            if (selected) setSelectedOption(selected);
          }}
          selected={selectedOption?.value || defaultOption.value} 
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
          <SearchIcon onClick={isSearchingNow ? onClear : handleSearch}>
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

export default FundingSearch;

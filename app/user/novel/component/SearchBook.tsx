"use client";

import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import { FilterContainer, DropdownWrapper, SearchWrapper } from "@/app/user/novel/component/SearchBook.styled";
import { SEARCH_OPTIONS } from "@/constants/SEARCH_OPTIONS";

interface FilterProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchBook = ({ selectedOption, setSelectedOption, searchQuery, setSearchQuery }: FilterProps) => {
  return (
    <FilterContainer>
      <DropdownWrapper>
        <Dropdown options={SEARCH_OPTIONS} onSelect={setSelectedOption} selected={selectedOption} />
      </DropdownWrapper>
      <SearchWrapper>
        <Input
          label=""
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          src="/icon/search.svg"
        />
      </SearchWrapper>
    </FilterContainer>
  );
};

export default SearchBook;

"use client";

import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import { FilterContainer, DropdownWrapper, SearchWrapper } from "@/app/user/novel/NovelPage.styled";

interface FilterProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const options = [
  { value: "genre", label: "장르" },
  { value: "title", label: "제목" },
  { value: "author", label: "작가명" },
];

const FilterComponent = ({ selectedOption, setSelectedOption, searchQuery, setSearchQuery }: FilterProps) => {
  return (
    <FilterContainer>
      <DropdownWrapper>
        <Dropdown options={options} onSelect={setSelectedOption} selected={selectedOption} />
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

export default FilterComponent;
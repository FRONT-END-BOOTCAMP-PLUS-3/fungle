"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import {
  SearchBox,
  SearchFieldButton,
  SearchFieldUl,
  Form,
  RecruitmentWrapper,
} from "./CommunitySearchFilter.styled";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import {
  COMMUNITY_LIST_ALIGN,
  COMMUNITY_POST,
} from "@/constants/COMMUNITY_POST_LIST";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";
import { useState } from "react";

export interface CommunitySearchFilterProps {
  onSearch: (searchParams: {
    selectedCommunity: string;
    selectedSearchField: string;
    searchTitle: string;
    searchAuthor: string;
    searchContent: string;
    searchRecruitment: string[];
    page: number;
    sort: string;
  }) => void;
}

const PLACEHOLDER_MAP: Record<string, string> = {
  title: "제목을 입력해주세요.",
  author: "작성자를 입력해주세요.",
  content: "내용을 입력해주세요.",
};

const CommunitySearchFilter = ({ onSearch }: CommunitySearchFilterProps) => {
  const [selectedCommunity, setSelectedCommunity] = useState("all");
  const [selectedSearchField, setSelectedSearchField] = useState("title");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [searchRecruitment, setSearchRecruitment] = useState<string[]>([]);

  const currentSearchValue =
    selectedSearchField === "title"
      ? searchTitle
      : selectedSearchField === "author"
      ? searchAuthor
      : selectedSearchField === "content"
      ? searchContent
      : "";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSearch({
      selectedCommunity,
      selectedSearchField,
      searchTitle,
      searchAuthor,
      searchContent,
      searchRecruitment,
      page: 1,
      sort: "latest",
    });
  };

  const handleRecruitmentSelect = (value: string) => {
    const option = RECRUITMENT_FIELDS.find((opt) => opt.value === value);
    if (!option) return;

    if (searchRecruitment.includes(option.label)) {
      setSearchRecruitment(
        searchRecruitment.filter((label) => label !== option.label)
      );
    } else {
      setSearchRecruitment([...searchRecruitment, option.label]);
    }
  };
  return (
    <Form onSubmit={handleFormSubmit}>
      <SearchFieldUl>
        {COMMUNITY_LIST_ALIGN.map((list) => {
          const isActive = selectedCommunity === list.value;

          return (
            <li key={list.id}>
              <SearchFieldButton
                onClick={() => {
                  setSelectedCommunity(list.value);
                }}
                $isActive={isActive}
              >
                {list.label}
              </SearchFieldButton>
            </li>
          );
        })}
      </SearchFieldUl>
      <SearchBox>
        <div style={{ width: "10rem" }}>
          <Dropdown
            options={COMMUNITY_POST}
            onSelect={setSelectedSearchField}
            selected={selectedSearchField}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Input
            label="검색 내용"
            hideLabel={true}
            placeholder={PLACEHOLDER_MAP[selectedSearchField]}
            src="/icon/search.svg"
            value={currentSearchValue}
            onChange={(e) => {
              if (selectedSearchField === "title") {
                setSearchTitle(e.target.value);
              } else if (selectedSearchField === "author") {
                setSearchAuthor(e.target.value);
              } else if (selectedSearchField === "content") {
                setSearchContent(e.target.value);
              }
            }}
          />
        </div>
      </SearchBox>
      <RecruitmentWrapper>
        <div style={{ width: "10rem" }}>
          <Dropdown
            options={RECRUITMENT_FIELDS}
            onSelect={handleRecruitmentSelect}
            selected={searchRecruitment}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Input
            label="모집분야"
            hideLabel={true}
            placeholder="모집분야를 입력하세요"
            iconPosition="left"
            src="/icon/hashtag.svg"
            value={searchRecruitment}
            onChange={(e) => {
              const newArray = e.target.value
                .split(",")
                .map((str) => str.trim())
                .filter((str) => str.length > 0);
              setSearchRecruitment(newArray);
            }}
          />
        </div>
      </RecruitmentWrapper>
      <Button buttonSize="big">검색</Button>
    </Form>
  );
};

export default CommunitySearchFilter;

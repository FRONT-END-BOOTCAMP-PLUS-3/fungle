"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import {
  SearchBox,
  SearchFieldButton,
  SearchFieldUl,
  Section,
} from "./CommunitySearchFilter.styled";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import { COMMUNITY_POST } from "@/constants/COMMUNITY_POST_LIST";
import { useState } from "react";
const COMMUNITY_LIST = [
  { id: 1, value: "all", label: "전체" },
  { id: 2, value: "recruiting", label: "모집중" },
  { id: 3, value: "completed", label: "모집완료" },
];

const PLACEHOLDER_MAP: Record<string, string> = {
  title: "제목을 입력해주세요.",
  author: "작성자를 입력해주세요.",
  content: "내용을 입력해주세요.",
};

interface CommunitySearchFilterProps {
  selectedCommunity: string;
  setSelectedCommunity: (value: string) => void;
}

const CommunitySearchFilter = ({
  selectedCommunity,
  setSelectedCommunity,
}: CommunitySearchFilterProps) => {
  const [selected, setSelected] = useState(COMMUNITY_POST[0].value);
  return (
    <Section>
      <SearchFieldUl>
        {COMMUNITY_LIST.map((list) => {
          const isActive = selectedCommunity === list.value;

          return (
            <li key={list.id}>
              <SearchFieldButton
                onClick={() => setSelectedCommunity(list.value)}
                $isActive={isActive}
              >
                {list.label}
              </SearchFieldButton>
            </li>
          );
        })}
      </SearchFieldUl>
      <SearchBox>
        <Dropdown
          options={COMMUNITY_POST}
          onSelect={setSelected}
          selected={selected}
          size="small"
        />
        <Input
          label="제목"
          hideLabel={true}
          placeholder={PLACEHOLDER_MAP[selected]}
          // iconPosition="right"
          src="/icon/search.svg"
        />
      </SearchBox>
      <Input
        label="장르"
        hideLabel={true}
        placeholder="장르를 입력하세요"
        src="/icon/hashtag.svg"
      />
      <Button buttonSize="big">검색</Button>
    </Section>
  );
};

export default CommunitySearchFilter;

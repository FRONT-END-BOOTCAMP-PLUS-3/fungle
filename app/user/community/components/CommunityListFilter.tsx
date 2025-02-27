"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import { COMMUNITY_POST_LIST } from "@/constants/COMMUNITY_POST_LIST";

import Image from "next/image";
import { EditButton, ListFilterWrapper } from "./CommunityListFilter.styled";

interface CommunityListFilterProps {
  onSortChange: (newSort: string) => void;

  selectedSort: string;
}
const CommunityListFilter = ({
  onSortChange,
  selectedSort,
}: CommunityListFilterProps) => {
  const handleSelect = (value: string) => {
    onSortChange(value);
  };
  return (
    <ListFilterWrapper>
      <Dropdown
        options={COMMUNITY_POST_LIST}
        onSelect={handleSelect}
        selected={selectedSort}
        size="small"
      />
      <EditButton>
        <Image
          src="/icon/edit_pen.svg"
          alt="수정 버튼"
          width={30}
          height={30}
        />
      </EditButton>
    </ListFilterWrapper>
  );
};

export default CommunityListFilter;

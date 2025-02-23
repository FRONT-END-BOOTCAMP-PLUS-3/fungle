"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import { COMMUNITY_POST_LIST } from "@/constants/COMMUNITY_POST_LIST";
import { useState } from "react";
import Image from "next/image";
import { EditButton, ListFilterWrapper } from "./CommunityListFilter.styled";

const CommunityListFilter = () => {
  const [selectedList, setSelectedList] = useState(
    COMMUNITY_POST_LIST[0].value
  );
  return (
    <ListFilterWrapper>
      <Dropdown
        options={COMMUNITY_POST_LIST}
        onSelect={setSelectedList}
        selected={selectedList}
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

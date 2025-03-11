"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import { COMMUNITY_POST_LIST } from "@/constants/COMMUNITY_POST_LIST";

import Image from "next/image";
import { EditButton, ListFilterWrapper } from "./CommunityListFilter.styled";
import { useRouter } from "next/navigation";

interface CommunityListFilterProps {
  onSortChange: (newSort: string) => void;

  selectedSort: string;
}
const CommunityListFilter = ({
  onSortChange,
  selectedSort,
}: CommunityListFilterProps) => {
  const router = useRouter();

  const handleSelect = (value: string) => {
    onSortChange(value);
  };

  const handleCreatePost = () => {
    router.push("/user/community/create");
  };
  return (
    <ListFilterWrapper>
      <Dropdown
        options={COMMUNITY_POST_LIST}
        onSelect={handleSelect}
        selected={selectedSort}
        size="small"
      />
      <EditButton onClick={handleCreatePost}>
        <Image
          src="/icon/edit_pen.svg"
          alt="작성 버튼"
          width={30}
          height={30}
        />
      </EditButton>
    </ListFilterWrapper>
  );
};

export default CommunityListFilter;

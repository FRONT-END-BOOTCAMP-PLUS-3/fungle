import { DropdownWrapper } from "./PostAndLikedListWrapper.styled";
import { LIKED_OPTIONS } from "@/constants/LIKED_OPTIONS";
import { useState } from "react";
import Dropdown from "@/components/dropdown/Dropdown";
import LikedNovelList from "./LikedNovelList";
import LikedPostList from "./LikedPostList";

const ProfileLikedList = () => {
  const [selected, setSelected] = useState<string>(LIKED_OPTIONS[0].value);

  return (
    <>
      <DropdownWrapper>
        <Dropdown
          options={LIKED_OPTIONS}
          onSelect={setSelected}
          selected={selected}
        />
      </DropdownWrapper>
      {selected === "novel" ? <LikedNovelList /> : <LikedPostList />}
    </>
  );
};

export default ProfileLikedList;

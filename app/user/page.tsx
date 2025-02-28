"use client";

import {
  ContentContainer,
  Divider,
  Main,
  ViewInfoSection,
} from "./MyPage.styled";
import ProfileIntroduce from "./components/ProfileIntroduce";
import ProfileView from "./components/ProfileView";
import ProfileInfo from "./components/ProfileInfo";
import ProfileMenu from "./components/ProfileMenu";
import { useState } from "react";
import ProfilePostList from "./components/ProfilePostList";
import ProfileLikedList from "./components/ProfileLikedList";

const Page = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");

  return (
    <Main>
      {/* 프로필 사진 & 닉네임 */}
      <ProfileView />
      <Divider />
      {/* 작성 글, 소설 개수 & 펀딩 금액  */}
      <ProfileInfo />
      <Divider />
      <ViewInfoSection>
        <ProfileMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <ContentContainer>
          {selectedMenu === "home" && <ProfileIntroduce />}
          {selectedMenu === "post" && <ProfilePostList />}
          {selectedMenu === "liked" && <ProfileLikedList />}
        </ContentContainer>
      </ViewInfoSection>
    </Main>
  );
};

export default Page;

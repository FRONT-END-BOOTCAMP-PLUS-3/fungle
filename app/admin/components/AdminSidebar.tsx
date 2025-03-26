"use client";

import { useState } from "react";
import {
  MenuItem,
  SidebarContainer,
  UnstyledLink,
} from "./AdminSidebar.styled";
import Image from "next/image";

const AdminSidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("소설 검토");

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <SidebarContainer>
      <Image src={"/logo/FUNGLE.svg"} alt="펀글 로고" width={180} height={90} />
      <ul>
        <UnstyledLink href={"/admin/novel"}>
          <MenuItem
            $isSelected={selectedMenu === "소설 검토"}
            onClick={() => handleMenuClick("소설 검토")}
          >
            소설 검토
          </MenuItem>
        </UnstyledLink>
        <UnstyledLink href={"/admin/user"}>
          <MenuItem
            $isSelected={selectedMenu === "회원 관리"}
            onClick={() => handleMenuClick("회원 관리")}
          >
            회원 관리
          </MenuItem>
        </UnstyledLink>
        <UnstyledLink href={"/admin/community"}>
          <MenuItem
            $isSelected={selectedMenu === "커뮤니티 관리"}
            onClick={() => handleMenuClick("커뮤니티 관리")}
          >
            커뮤니티 관리
          </MenuItem>
        </UnstyledLink>
        <UnstyledLink href={"/admin/funding"}>
          <MenuItem
            $isSelected={selectedMenu === "펀딩 관리"}
            onClick={() => handleMenuClick("펀딩 관리")}
          >
            펀딩 관리
          </MenuItem>
        </UnstyledLink>
      </ul>
    </SidebarContainer>
  );
};

export default AdminSidebar;

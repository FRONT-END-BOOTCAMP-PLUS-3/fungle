"use client";

import {
  HeaderWrapper,
  HeaderContent,
  LogoContainer,
  MenuButton,
  LogoutButton,
} from "./headerLogout.styled";
import Image from "next/image";

const HeaderLogout = () => {
  const handleLogout = () => {
    console.log("로그아웃 실행!");
  };

  return (
    <HeaderWrapper>
      <HeaderContent>
        <MenuButton>
          <Image
            src="/icon/hamburger.svg"
            alt="Menu Icon"
            width={32}
            height={32}
          />
        </MenuButton>

        <LogoContainer>
          <Image
            src="/logo/FUNGLE.svg"
            alt="Fungle Logo"
            width={96}
            height={32}
          />
        </LogoContainer>

        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default HeaderLogout;

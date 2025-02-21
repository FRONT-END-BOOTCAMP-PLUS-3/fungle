"use client";

import {
  HeaderWrapper,
  HeaderContent,
  LogoContainer,
  MenuButton,
  UserIcon,
} from "./headerLogin.styled";
import Image from "next/image";

const HeaderLogin = () => {
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

        <UserIcon>
          <Image
            src="/icon/person.svg"
            alt="User Icon"
            width={32}
            height={32}
          />
        </UserIcon>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default HeaderLogin;

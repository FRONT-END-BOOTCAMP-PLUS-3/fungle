import {
  HeaderWrapper,
  MenuButton,
  LogoContainer,
  LogoImage,
  UserIcon,
} from "./header.style";
import { FiMenu } from "react-icons/fi"; // 햄버거 아이콘
import { FaRegUser } from "react-icons/fa"; // 유저 아이콘

const Header = () => {
  return (
    <HeaderWrapper>
      {/* 왼쪽 햄버거 버튼 */}
      <MenuButton>
        <FiMenu />
      </MenuButton>

      {/* 가운데 로고 */}
      <LogoContainer>
        <LogoImage src="logo/FUNGLE.svg" alt="Fungle Logo" />
      </LogoContainer>

      {/* 오른쪽 유저 아이콘 */}
      <UserIcon>
        <FaRegUser />
      </UserIcon>
    </HeaderWrapper>
  );
};

export default Header;

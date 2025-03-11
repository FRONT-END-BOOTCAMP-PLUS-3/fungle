"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "../sidebar/Sidebar";
import {
  HeaderWrapper,
  HeaderContent,
  LogoContainer,
  MenuButton,
  UserIcon,
  LogoutButton,
} from "./Header.styled";
import useAuthStore from "@/store/useAuthStore";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ 사이드바 상태 추가
  const { setUser } = useAuthStore();

  const pathname = usePathname();
  const router = useRouter();
  const hideHeader =
    pathname === "/login" || pathname === "/signup" || pathname === "/";

  const goToMyPage = () => {
    if (!pathname.endsWith("/user")) {
      router.push("/user");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    useAuthStore.setState({ isLoggedIn: false });
    router.push("/");
  };

  if (hideHeader) {
    return null;
  }

  return (
    <>
      {/* ✅ 사이드바가 열려 있으면 헤더를 숨김 */}
      {!isSidebarOpen && (
        <HeaderWrapper>
          <HeaderContent>
            <MenuButton onClick={() => setIsSidebarOpen(true)}>
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

            {pathname === "/user" ? (
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            ) : (
              <UserIcon onClick={goToMyPage}>
                <Image
                  src="/icon/person.svg"
                  alt="User Icon"
                  width={32}
                  height={32}
                />
              </UserIcon>
            )}
          </HeaderContent>
        </HeaderWrapper>
      )}

      {/* ✅ 사이드바 컴포넌트 */}
      <Sidebar $isOpen={isSidebarOpen} $setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default Header;

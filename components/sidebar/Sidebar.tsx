import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarItem,
  SidebarList,
  LogoutButton,
  CloseButton,
} from "@/components/sidebar/Sidebar.styled";
import useAuthStore from "@/store/useAuthStore"; 

interface SidebarProps {
  $isOpen: boolean;
  $setIsOpen: ($isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ $isOpen, $setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, setUser } = useAuthStore(); 
  const [hoveredItem, setHoveredItem] = useState<string>("");

  if (!$isOpen) return null;

  const menuItems = [
    { name: "소설", icon: "/icon/book.svg", path: "/user/novel" },
    { name: "커뮤니티", icon: "/icon/people.svg", path: "/user/community" },
    { name: "마이페이지", icon: "/icon/person.svg", path: "/user" },
    { name: "펀딩", icon: "/icon/money.svg", path: "/user/funding" },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });

      if (!response.ok) {
        throw new Error("로그아웃에 실패했습니다.");
      }

      setUser(null); 
      useAuthStore.setState({ isLoggedIn: false });
      router.push("/");
    } catch (error) {
      throw new Error("서버 에러 : 로그아웃 실패");
    }
  };

  return (
    <SidebarContainer $isOpen={$isOpen}>
      <SidebarHeader>
        <Image src="/logo/FUNGLE.svg" alt="fungle" width={95} height={30} />
        <CloseButton onClick={() => $setIsOpen(false)}>
          <Image src="/icon/close.svg" alt="close" width={24} height={24} />
        </CloseButton>
      </SidebarHeader>

      <SidebarList>
        {menuItems.map((item) => {
          const isHovered = hoveredItem === item.name;
          const isActive = pathname === item.path;

          return (
            <SidebarItem
              key={item.name}
              className={isActive ? "active" : ""}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem("")}
              onClick={() => {
                router.push(item.path);
                $setIsOpen(false);
              }}
            >
              <Image
                src={isHovered || isActive ? item.icon.replace(".svg", "_white.svg") : item.icon}
                alt={item.name}
                width={20}
                height={20}
              />
              <span>{item.name}</span>
            </SidebarItem>
          );
        })}
      </SidebarList>

      {isLoggedIn ? (
        <LogoutButton onClick={handleLogout}>
          로그아웃
          <Image src="/icon/logout.svg" alt="로그아웃" width={20} height={20} />
        </LogoutButton>
      ) : (
        <LogoutButton onClick={() => router.push("/login")}>
          로그인
          <Image src="/icon/login.svg" alt="로그인" width={20} height={20} />
        </LogoutButton>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

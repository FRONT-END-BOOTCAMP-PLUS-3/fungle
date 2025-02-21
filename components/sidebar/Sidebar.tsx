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

interface SidebarProps {
  $isOpen: boolean;
  $setIsOpen: ($isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ $isOpen, $setIsOpen }) => {
  // ✅ 항상 최상단에서 실행하여 React Hook 규칙 준수
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string>(""); // ✅ 빈 문자열로 초기화하여 타입 충돌 방지

  if (!$isOpen) return <></>; // ✅ 빈 Fragment를 반환하여 Hook 실행 보장

  const menuItems = [
    { name: "홈", icon: "/icon/home.svg", path: "/" },
    { name: "소설", icon: "/icon/book.svg", path: "/user/novel" },
    { name: "커뮤니티", icon: "/icon/people.svg", path: "/user/community" },
    { name: "마이페이지", icon: "/icon/person.svg", path: "/user" },
    { name: "펀딩", icon: "/icon/money.svg", path: "/user/funding" },
  ];

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
              onMouseLeave={() => setHoveredItem("")} // ✅ 수정: null 대신 빈 문자열로 리셋
              onClick={() => {
                router.push(item.path);
                $setIsOpen(false);
              }}
            >
              <Image
                src={
                  isHovered || isActive
                    ? item.icon.replace(".svg", "_white.svg")
                    : item.icon
                }
                alt={item.name}
                width={20}
                height={20}
              />
              <span>{item.name}</span>
            </SidebarItem>
          );
        })}
      </SidebarList>

      <LogoutButton>
        로그아웃
        <Image src="/icon/logout.svg" alt="로그아웃" width={20} height={20} />
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;

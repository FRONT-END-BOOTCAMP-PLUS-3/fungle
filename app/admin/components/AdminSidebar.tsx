"use client";

import { usePathname } from "next/navigation";
import {
  MenuItem,
  SidebarContainer,
  UnstyledLink,
} from "./AdminSidebar.styled";
import Image from "next/image";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin/novel", label: "소설 검토" },
    { href: "/admin/user", label: "회원 관리" },
    { href: "/admin/community", label: "커뮤니티 관리" },
  ];

  return (
    <SidebarContainer>
      <Image src={"/logo/FUNGLE.svg"} alt="펀글 로고" width={180} height={90} />
      <ul>
        {menuItems.map((item) => (
          <UnstyledLink key={item.href} href={item.href}>
            <MenuItem $isSelected={pathname === item.href}>
              {item.label}
            </MenuItem>
          </UnstyledLink>
        ))}
      </ul>
    </SidebarContainer>
  );
};

export default AdminSidebar;

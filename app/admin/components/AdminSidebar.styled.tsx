import Link from "next/link";
import styled from "styled-components";

interface MenuItemProps {
  $isSelected: boolean;
}

export const SidebarContainer = styled.div`
  width: 22.5rem;
  height: 100vh;
  background-color: var(--gray-300);
  color: var(--black-color);
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const MenuItem = styled.li<MenuItemProps>`
  padding: 0.625rem 1.25rem;
  background-color: ${(props) =>
    props.$isSelected ? "var(--primary-color)" : "transparent"};
  color: ${(props) =>
    props.$isSelected ? "var(--white-color)" : "var(--black-color)"};
  border-radius: 0.625rem;

  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? "var(--primary-color)" : "var(--gray-500"};
  }
`;

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

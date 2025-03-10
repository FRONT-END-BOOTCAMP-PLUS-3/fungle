import Link from "next/link";
import styled from "styled-components";

interface MenuItemProps {
  $isSelected: boolean;
}

export const SidebarContainer = styled.div`
  width: 15rem;
  height: 100vh;
  background-color: var(--gray-100);
  color: var(--black-color);
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 1rem 0;
  gap: 1rem;

  img {
    padding-left: 0.5rem;
  }
`;

export const MenuItem = styled.li<MenuItemProps>`
  padding: 0.625rem 1.25rem;
  background-color: ${(props) =>
    props.$isSelected ? "var(--primary-color)" : "transparent"};
  color: ${(props) =>
    props.$isSelected ? "var(--white-color)" : "var(--black-color)"};
  border-radius: 0 0.625rem 0.625rem 0;
  list-style-type: none;
  font-weight: ${(props) => (props.$isSelected ? 700 : 500)};

  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? "var(--primary-color)" : "var(--gray-500"};
  }
`;

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

import Link from "next/link";
import styled from "styled-components";

interface MenuItemProps {
  $isSelected: boolean;
}

export const SidebarContainer = styled.div`
  width: 14rem;
  min-width: 14rem;
  min-height: 100vh;
  background-color: var(--white-color);
  color: var(--black-color);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  gap: 2rem;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;

  img {
    padding: 0 1.5rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export const MenuItem = styled.li<MenuItemProps>`
  padding: 0.875rem 1.5rem;
  background-color: ${(props) =>
    props.$isSelected ? "var(--primary-color)" : "transparent"};
  color: ${(props) =>
    props.$isSelected ? "var(--white-color)" : "var(--black-color)"};
  border-radius: 0;
  list-style-type: none;
  font-weight: ${(props) => (props.$isSelected ? 600 : 400)};
  font-size: var(--font-size-base);
  transition: all 0.2s ease;
  cursor: pointer;
  margin: 0 0.75rem;
  border-radius: 0.375rem;

  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? "var(--primary-color)" : "var(--gray-100)"};
  }
`;

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
`;

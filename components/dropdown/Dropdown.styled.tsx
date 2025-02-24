import styled from "styled-components";

export interface StyledItemProps {
  $isFirst?: boolean;
  $isLast?: boolean;
}

export const DropdownWrapper = styled.div<{ size: "default" | "small" }>`
  position: relative;
  width: ${({ size }) => (size === "small" ? "7rem" : "100%")};
  height: 2.5rem;
`;

export const StyledButton = styled.button<{ size: "default" | "small" }>`
  position: relative;
  width: ${({ size }) => (size === "small" ? "7rem" : "100%")};
  padding: ${({ size }) =>
    size === "small" ? "0.625rem 2rem 0.625rem 0.625rem" : "0.625rem"};
  border: 0.0625rem solid var(--gray-300);
  border-radius: 0.625rem;
  background: var(--white-color);
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  font-size: var(--font-size-placeholder);

  &:hover {
    border: 0.0625rem solid var(--hover-color);
  }
  &:active {
    border: 0.0625rem solid var(--active-color);
  }
`;

export const DropdownArrow = styled.img`
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const StyledMenu = styled.ul`
  margin-top: 0.3125rem;
  width: 100%;
  background: var(--white-color);
  border: 0.0625rem solid var(--gray-300);
  border-radius: 0.625rem;
  list-style: none;
  overflow-y: auto;
  z-index: 1000;
  position: absolute;
  text-align: center;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gray-300);
    border-radius: 1rem;
  }
`;

export const StyledItem = styled.div<StyledItemProps>`
  padding: 0.625rem;
  cursor: pointer;
  border: 0.03125rem solid var(--gray-300);

  &:hover {
    background: var(--hover-color);
    color: var(--white-color);
    border-radius: ${({ $isFirst, $isLast }) =>
      $isFirst
        ? "0.625rem 0.625rem 0 0"
        : $isLast
        ? "0 0 0.625rem 0.625rem"
        : "0"};
  }

  &:active {
    background: var(--primary-color);
    color: var(--white-color);
  }
`;

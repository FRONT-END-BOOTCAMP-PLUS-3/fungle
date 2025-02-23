import styled from "styled-components";

export const PaginationWrapper = styled.nav`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

export const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
  width: 2rem;
  height: 2rem;
  border: 0.0625rem solid var(--gray-300);
  background-color: var(--white-color);
  color: var(--gray-900);
  cursor: pointer;
  border-radius: 0.25rem;

  ${({ $active }) =>
    $active &&
    `
      background-color: var(--primary-color);
      border: none;
      color: var(--white-color);
      font-weight: 600;
    `}
`;

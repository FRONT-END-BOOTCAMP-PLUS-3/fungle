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
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  border-radius: 0.25rem;

  ${({ $active }) =>
    $active &&
    `
      background-color: var(--primary-color);
      color: #fff;
      font-weight: 600;
    `}
`;

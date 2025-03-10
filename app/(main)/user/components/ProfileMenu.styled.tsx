import styled from "styled-components";

export const ViewInfoUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  border-bottom: 0.125rem solid var(--gray-300);

  li {
    width: 100%;
  }
`;

export const ViewInfoButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  border: none;
  cursor: pointer;
  background-color: inherit;
  padding: 0.3125rem 0.125rem;
  position: relative;
  color: ${({ $isActive }) =>
    $isActive ? "var(--primary-color)" : "var(--gray-500)"};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.2rem;
    height: 0.125rem;
    background-color: ${({ $isActive }) =>
      $isActive ? "var(--primary-color)" : "transparent"};
    transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }
`;

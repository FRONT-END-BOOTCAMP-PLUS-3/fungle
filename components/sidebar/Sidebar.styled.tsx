import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%); 
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: 17.5rem;
  height: 100vh;
  background: var(--white-color);
  border-right: solid 0.0625rem var(--gray-300);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.7s ease-out, opacity 0.7s ease-out;
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : "none")} 0.7s forwards;
  z-index: 1000;
`;



export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1rem;
  border-bottom: solid 0.0625rem var(--hover-color);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SidebarItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--black-color);
  padding: 0.9375rem 0.625rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--hover-color);
    color: var(--white-color);
  }

  &.active {
    background: var(--primary-color);
    color: var(--white-color);
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-lg);
  color: var(--primary-color);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.625rem;
  position: absolute;
  bottom: 0;
  right: 0;

  &:hover {
    font-weight: 700;
  }
`;

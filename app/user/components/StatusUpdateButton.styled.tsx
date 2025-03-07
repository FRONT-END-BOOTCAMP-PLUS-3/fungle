import styled from "styled-components";

export const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const MenuWrapper = styled.div`
  position: absolute;
  width: 6.25rem;
  background-color: var(--white-color);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MenuItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--white-color);
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-placeholder);
  font-weight: bold;
  color: var(--gray-900);

  &:hover {
    background-color: var(--gray-100);
  }
`;

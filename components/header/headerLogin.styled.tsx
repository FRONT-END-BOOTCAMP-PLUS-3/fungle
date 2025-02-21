import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  position: relative;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 64rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  width: 3rem;
`;

export const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const UserIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  width: 3rem;
`;

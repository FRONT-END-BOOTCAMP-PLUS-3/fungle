import styled from "styled-components";

interface TabProps {
  $active: boolean;
}

export const Main = styled.div`
  overflow-y: scroll;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.hr`
  width: 100%;
  height: 0.0635rem;
  min-height: 0.0635rem;
  background: var(--gray-300);
  border: 0;
`;


export const TabContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const Tab = styled.div<TabProps>`
  cursor: pointer;
  position: relative;
  color: ${({ $active }) => ($active ? "var(--primary-color)" : "black")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  padding: 0.625rem 0;

  &:after {
    content: "";
    display: ${({ $active }) => ($active ? "block" : "none")};
    width: 100%;
    height: 0.125rem;
    background: var(--primary-color);
    position: absolute;
    bottom: -0.125rem;
    left: 0;
  }
`;

export const SearchContainer = styled.div`
  margin-top : 1.25rem;
`;

export const Content = styled.div`
  margin: 1rem 0;
`;

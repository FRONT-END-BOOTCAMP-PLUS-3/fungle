import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;

export const DropdownWrapper = styled.div`
  width: 9.375rem;
`;

export const SearchWrapper = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchIcon = styled.button`
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: .3125rem;
  display: flex;
  align-items: center;

  img {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    opacity: 0.7;
  }
`;

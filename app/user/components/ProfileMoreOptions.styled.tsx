import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const MoreOptionsButton = styled.button`
  font-size: var(--font-size-sm);
  font-weight: 700;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  justify-content: flex-end;
  display: flex;

  img {
    transform: rotate(90deg);
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  width: 6rem;
  top: 2rem;
  right: 0;
  background: var(--white-color);
  box-shadow: 0px 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  z-index: 100;

  button {
    color: var(--leave-color);
    background-color: transparent;
    border: none;
    font-weight: 700;
    padding: 0 1rem;
    font-size: var(--font-size-base);
    cursor: pointer;
  }
`;

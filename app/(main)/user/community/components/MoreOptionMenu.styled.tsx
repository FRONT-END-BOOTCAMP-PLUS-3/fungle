"use client";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 1.875rem;
  right: 0;
  width: 7.5rem;
  background: var(--white-color);
  box-shadow: 0px 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  z-index: 100;
`;

export const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: var(--gray-100);
  }
`;

export const EditBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: var(--gray-100);
  }
`;

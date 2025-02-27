"use client";
import styled from "styled-components";
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;
export const SearchFieldUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 0.625rem;
  border-bottom: 0.125rem solid var(--gray-300);
`;

export const SearchFieldButton = styled.button<{ $isActive: boolean }>`
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

export const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
`;

export const RecruitmentWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
`;

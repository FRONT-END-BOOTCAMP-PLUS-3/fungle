"use client";
import styled from "styled-components";

interface StyledProps {
  width?: string;
  height?: string;
}

export const Label = styled.label`
  overflow: hidden;
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: circle(0);
  width: 1px;
  height: 1px;
  margin: -1px;
  white-space: nowrap;
`;

export const TextareaComponent = styled.textarea<StyledProps>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "10rem"};
  text-align: left;
  border-radius: 0.875rem;
  border-color: var(--gray-300);
  resize: none;
  padding: 0.625rem 1rem;
  font-size: var(--font-size-placeholder);
`;

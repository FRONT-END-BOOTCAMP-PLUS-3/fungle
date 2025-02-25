"use client";
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0 1.25rem;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 0.625rem;
  max-width: 23.4375rem;
  width: 100%;
  box-shadow: 0 0.625rem 0.9375rem rgba(0, 0, 0, 0.2),
    0 0.25rem 0.375rem rgba(0, 0, 0, 0.15);
`;

export const ModalBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-top-right-radius: 0.625rem;
  border-top-left-radius: 0.625rem;
  background-color: var(--primary-color);
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
`;

export const CloseModalButton = styled.div`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #000;

  &:hover {
    transform: scale(1.5);
    transition: transform 0.5s ease;
  }
`;

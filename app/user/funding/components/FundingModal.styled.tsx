import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 24rem;
  background-color: var(--white-color);
  border-radius: 1rem 1rem 0 0;
  padding: 1.5rem;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--primary-color);
`;

export const FundingAmount = styled.div`
  font-size: 1.875rem;
`;

export const Description = styled.p`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  color: var(--gray-500);
`;

export const Divider = styled.div`
  background-color: var(--gray-100);
  margin: 0.8rem 0;
  height: 0.06rem;
`;

export const PayButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const DesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

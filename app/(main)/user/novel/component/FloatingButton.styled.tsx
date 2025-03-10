import styled from "styled-components";

export const FabContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  z-index: 1000;
`;

export const FabButton = styled.button`
  cursor: pointer;
  border: none;  
  background: none; 
  transition: transform 0.3s ease-in-out, background-color 0.2s ease-in-out;
`;

export const FabMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const FabMenuItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: var(--white-color);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: var(--gray-900);

`;

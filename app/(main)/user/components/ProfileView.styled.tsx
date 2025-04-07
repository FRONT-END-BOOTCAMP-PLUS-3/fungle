import styled from "styled-components";

export const ProfileSection = styled.section`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const MoreOptionsButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const ErrorMessage = styled.p`
  font-size: var(--font-size-sm);
  color: var(--error-color);
  visibility: ${({ children }) => (children ? "visible" : "hidden")};
`;

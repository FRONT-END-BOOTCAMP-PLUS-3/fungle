import styled from "styled-components";

export const CommentSection = styled.section<{ $isExpanded: boolean }>`
  position: relative;
`;

export const TextareaWrapper = styled.div<{ $isOpen: boolean }>`
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  max-height: ${(props) => (props.$isOpen ? "40vh" : "0")};

  margin-bottom: 1rem;
`;

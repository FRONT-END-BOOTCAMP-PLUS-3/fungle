import styled from "styled-components";

export const CommentSection = styled.section<{ $isExpanded: boolean }>`
  position: relative;
  transition: margin-bottom 0.3s ease-in-out;
  margin-bottom: ${(props) => (props.$isExpanded ? "3rem" : "")};
`;

export const TextareaWrapper = styled.div<{ $isOpen: boolean }>`
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  max-height: ${(props) => (props.$isOpen ? "20vh" : "0")};
`;

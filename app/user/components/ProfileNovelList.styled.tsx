import styled from "styled-components";
import { EpisodeItem } from "../novel/[novelId]/NovelIdPage.styled";

export const ProfileNovelItem = styled(EpisodeItem)`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .novel-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .novel-manage {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.8rem;
    align-items: flex-end;
    margin-top: auto;
  }
`;

export const ArrowWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

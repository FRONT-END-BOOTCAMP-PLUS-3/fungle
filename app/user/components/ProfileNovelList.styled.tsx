import styled from "styled-components";
import { EpisodeItem } from "../novel/[novelId]/NovelIdPage.styled";

export const ProfileNovelItem = styled(EpisodeItem)`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  .episode-info {
    margin-left: 0;
    width: 100%;
    max-width: none;
  }

  .novel-title-status {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .novel-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }

  .novel-manage {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    align-items: flex-end;
    margin-top: auto;
  }

  .novel-title {
    display: flex;
    flex-direction: row;
    width: 100%;
    white-space: normal;
    justify-content: space-between;
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

export const EpisodeList = styled.ul`
  list-style: none;
  padding: 0 0.625rem;
  margin: 0;
  background-color: var(--gray-100);

  li {
    width: 100%;
  }
`;

export const EpisodeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-300);
  gap: 0.3rem;
  padding: 0.2rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const EpisodeStatus = styled.div<{ status: string }>`
  width: 4rem;
  border-radius: 0.625rem;
  background-color: ${({ status }) =>
    status === "pending"
      ? "var(--gray-500)"
      : status === "approved"
      ? "var(--success-color)"
      : "var(--leave-color)"};
  color: var(--white-color);
  font-size: var(--font-size-sm);
  font-weight: 600;
  padding: 0 0.4rem;
  height: fit-content;
  text-align: center;
`;

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

export const EpisodeList = styled.ul`
  list-style: none;
  padding: 0.625rem;
  margin: 0;
  background-color: var(--gray-100);

  li {
    width: 100%;
    padding: 0.25rem 0;
  }
`;

export const EpisodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-300);

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

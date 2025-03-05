import styled from "styled-components";

interface DayProps {
  $active: boolean;
}

interface ListItemProps {
  $isLast: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.25rem;
  gap: 1.25rem;
  overflow-y: scroll;`
;


export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.625rem 0;
`
;

export const Card = styled.div`
  border-radius: 0.625rem;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  text-align: center;

  .thumbnail {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 0.625rem 0.625rem 0 0;
  }

  .content{
    padding: 0.625rem;
  }

  .title {
    text-align: center;
    font-weight: bold;
    width: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    font-size: 0.9rem;
    gap: 0.3125rem;
    padding: 0 0.5rem;
  }

  .progress-container {
    width: 100%;
    margin-top: 0.5rem;
    text-align: center;
  }

  .progress-bar {
    width: 100%;
    height: 0.5rem;
    border-radius: 0.3125rem;
    background: var(--gray0300);
    position: relative;
  }

  .progress {
    height: 100%;
    border-radius: 0.3125rem;
    background: var(--primary-color);
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0.9375rem 0;`
;

export const DropdownWrapper = styled.div`
  flex: 1;`
;

export const SearchWrapper = styled.div`
  flex: 2;
  `
;

export const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem;
  border-bottom: 0.0625rem solid var(--gray-300);
`;




export const Day = styled.button<DayProps>`
  font-weight: bold;
  color: ${({ $active }) => ($active ? "var(--primary-color)" : "var(--gray-900)")};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.625rem;
  position: relative;

  &:after {
    content: "";
    display: ${({ $active }) => ($active ? "var(--gray-900)" : "none")};
    width: 80%;
    height: 0.125rem;
    background: var(--primary-color);
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr)); 

  gap: 0.625rem;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`;

export const ListItem = styled.div<ListItemProps>`
  display: flex;
  align-items: center;
  padding:  0.9375rem;
  border-bottom: ${({ $isLast }) => ($isLast ? "none" : "0.0625rem solid var(--gray-500)")};
  gap:  0.9375rem;

  .rank {
    font-size: var(--font-size-xxl);
    font-weight: bold;
  }

  .thumbnail img {
    width: 3.75rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 0.3125rem;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: var(--font-size-lg);
    font-weight: bold;
  }

  .author {
    font-size: var(--font-size-base);
    color: gray;
  }

  .tags {
    font-size: var(--font-size-footer);
    color: var(--primary-color);
  }
`;

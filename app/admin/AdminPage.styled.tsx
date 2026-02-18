import { styled } from "styled-components";

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const AdminMain = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex-grow: 1;
  overflow: auto;
  min-width: 0;
`;

export const TableWrapper = styled.div`
  width: fit-content;
  min-width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;

  thead {
    background-color: var(--primary-color);
  }

  th {
    color: var(--white-color);
    text-align: center;
    padding: 1rem;
    min-width: 8rem;
  }

  td {
    text-align: center;
    font-size: var(--font-size-base);
    padding: 1rem;
  }
`;

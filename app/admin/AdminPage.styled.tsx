import { styled } from "styled-components";

export const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--gray-100);
`;

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  background-color: var(--white-color);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: var(--font-size-xxl);
    font-weight: 700;
    color: var(--black-color);
    margin: 0;
  }
`;

export const AdminMain = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex-grow: 1;
  overflow: auto;
  min-width: 0;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: var(--white-color);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: var(--white-color);

  thead {
    background-color: var(--primary-color);
  }

  th {
    color: var(--white-color);
    text-align: left;
    padding: 1rem;
    font-weight: 600;
    font-size: var(--font-size-base);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);

    &:first-child {
      padding-left: 1.5rem;
    }

    &:last-child {
      padding-right: 1.5rem;
    }
  }

  tbody {
    tr {
      transition: background-color 0.15s ease;
      border-bottom: 1px solid var(--gray-300);

      &:hover {
        background-color: var(--gray-100);
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  td {
    text-align: left;
    font-size: var(--font-size-base);
    padding: 1rem;
    color: var(--black-color);
    vertical-align: middle;

    &:first-child {
      padding-left: 1.5rem;
    }

    &:last-child {
      padding-right: 1.5rem;
    }
  }
`;

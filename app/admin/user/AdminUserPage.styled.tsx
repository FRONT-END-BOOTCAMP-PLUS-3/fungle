import styled from "styled-components";
import { Table } from "../AdminPage.styled";

export const UserTable = styled(Table)`
  td {
    img {
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--gray-300);
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.05);
        border-color: var(--primary-color);
      }
    }
  }

  .delete-user {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    text-align: center;
    font-size: var(--font-size-footer);
    color: var(--gray-500);

    .button-wrapper {
      display: flex;
      justify-content: center;
    }
  }

  tbody tr td:nth-child(4) {
    text-transform: capitalize;
    font-weight: 500;
  }

  tbody tr td:nth-child(5) {
    max-width: 20rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

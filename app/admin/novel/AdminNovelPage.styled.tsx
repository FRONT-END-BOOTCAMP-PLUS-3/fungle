"use client";

import { styled } from "styled-components";

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--primary-color);
  width: 500px;
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
  }
`;

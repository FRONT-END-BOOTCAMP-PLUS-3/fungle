"use client";

import { EPISODE_STATUS } from "@/constants/EPISODE_STATUS";
import { styled } from "styled-components";

const getStatusColor = (status: string) => {
  switch (status) {
    case EPISODE_STATUS.find((s) => s.value === "approved")?.value:
      return "var(--success-color)";
    case EPISODE_STATUS.find((s) => s.value === "pending")?.value:
      return "var(--gray-500)";
    default:
      return "var(--black-color)";
  }
};

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding: 1rem 0;
`;

export const AdminMain = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem;
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
  }

  td {
    text-align: center;
    font-size: var(--font-size-base);
    padding: 1rem;
  }
`;

export const StatusText = styled.td<{ status: string }>`
  color: ${({ status }) => getStatusColor(status)};
  font-weight: 700;
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  gap: 0.5rem;
  .episode-content {
    overflow-y: scroll;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

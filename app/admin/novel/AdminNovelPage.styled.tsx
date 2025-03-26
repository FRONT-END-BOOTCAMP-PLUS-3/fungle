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

export const StatusText = styled.td<{ $status: string }>`
  color: ${({ $status }) => getStatusColor($status)};
  font-weight: 700;
`;

export const ModalContentWrapper = styled.div`
  width: 100%;
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

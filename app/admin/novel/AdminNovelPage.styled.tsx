"use client";

import { EPISODE_STATUS } from "@/constants/EPISODE_STATUS";
import { styled } from "styled-components";

const getStatusColor = (status: string) => {
  switch (status) {
    case EPISODE_STATUS.find((s) => s.value === "approved")?.value:
      return "var(--success-color)";
    case EPISODE_STATUS.find((s) => s.value === "pending")?.value:
      return "#ff9800";
    case EPISODE_STATUS.find((s) => s.value === "rejected")?.value:
      return "var(--error-color)";
    default:
      return "var(--gray-500)";
  }
};

const getStatusBgColor = (status: string) => {
  switch (status) {
    case EPISODE_STATUS.find((s) => s.value === "approved")?.value:
      return "rgba(0, 122, 77, 0.1)";
    case EPISODE_STATUS.find((s) => s.value === "pending")?.value:
      return "rgba(255, 152, 0, 0.1)";
    case EPISODE_STATUS.find((s) => s.value === "rejected")?.value:
      return "rgba(255, 0, 0, 0.1)";
    default:
      return "rgba(158, 158, 158, 0.1)";
  }
};

export const StatusText = styled.td<{ status: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;

  &::before {
    content: attr(data-status);
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: var(--font-size-footer);
    font-weight: 600;
    color: ${({ status }) => getStatusColor(status)};
    background-color: ${({ status }) => getStatusBgColor(status)};
    white-space: nowrap;
  }
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  gap: 1.5rem;
  padding: 0.5rem;

  h3 {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--black-color);
    margin: 0 0 0.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--gray-300);
  }

  p {
    margin: 0;
    line-height: 1.6;
    color: var(--black-color);

    strong {
      font-weight: 600;
      color: var(--primary-color);
      margin-right: 0.5rem;
    }
  }

  .episode-content {
    max-height: 40vh;
    overflow-y: auto;
    padding: 1rem;
    background-color: var(--gray-100);
    border-radius: 0.375rem;
    border: 1px solid var(--gray-300);
    line-height: 1.8;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-300);
  margin-top: auto;
`;

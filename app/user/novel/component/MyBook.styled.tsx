import styled from "styled-components";

export const MyBookContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 0.625rem;
  padding-bottom: 0.625rem;
  white-space: nowrap;
  scrollbar-width: thin; 
  scrollbar-color: transparent transparent; 
  min-height: 18.75rem;

  &::-webkit-scrollbar {
    height: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); 
    border-radius: 0.625rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Card = styled.div`
  border-radius: 0.625rem;
  padding: 0.625rem;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 7.5rem;
  max-width: 10rem;
  flex-shrink: 0;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .thumbnail {
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 0.625rem;
    overflow: hidden;
  }

  .status {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: var(--gray-300);
    color: var(--white-color);
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
    border-radius: 0.3125rem;
  }

  .status.completed {
    background-color: var(--leave-color);
  }

  .status.paused {
    background-color: var(--gray-500);
  }

  .status.ongoing {
    background-color: var(--success-color);
  }

  .title {
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
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

  .info p {
    margin: 0;
    text-align: left;
    width: 100%;
  }
`;

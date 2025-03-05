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
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 20px 0;
`
;


export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 0.625rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
    height: 8.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid var(--gray-500);
  }

  .status {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: gray;
    color: white;
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
    border-radius: 5px;
  }

  .status.complete {
    background-color: var(--success-color);
  }

  .status.paused {
    background-color: var(--gray-500);
  }

  .status.serializing {
    background-color: var(--leave-color);
  }

  /* 제목은 가운데 정렬 */
  .title {
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* "1단계", "펀딩금액"은 왼쪽 정렬 */
    justify-content: center;
    width: 100%;
    font-size: 0.9rem;
    gap: 0.3125rem;
    padding: 0 0.5rem;
  }

  .info p {
    margin: 0;
    text-align: left; /* 텍스트 왼쪽 정렬 */
    width: 100%;
  }

  .progress-container {
    width: 100%;
    margin-top: 0.5rem;
    text-align: center;
  }

  .progress-bar {
    width: 100%;
    height: 0.5rem;
    border-radius: 5px;
    background: lightgray;
    position: relative;
  }

  .progress {
    height: 100%;
    border-radius: 5px;
    background: navy;
  }
`;

"use client";

import styled from "styled-components";

export const Main = styled.div`
  overflow-y: scroll;
`

export const GradientWrapper = styled.div`
  position: relative;
  background: linear-gradient(to top, var(--primary-color) 0%, var(--white-color) 90%);
  padding: 1.5rem 1rem; 
`;


export const StatusSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;

  .profile-img {
    border-radius: 50%;
  }
`;

export const Badge = styled.span`
  display: flex; 
  align-items: center; 
  justify-content: center; 
  background: var(--success-color);
  color: var(--white-color);
  width: 2.8125rem;
  height: 1.6875rem;
  border-radius: 1.25rem;
  font-size: var(--font-size-footer);
  text-align: center;
  margin-right: 0.5rem;
`;


export const NovelHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .categories {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .categories span {
    background: var(--gray-700);
    color: var(--white-color);
    padding: 0.3rem 0.5rem;
    font-size: 0.875rem;
  }

  h1 {
    margin-top: 2rem;
    color: var(--white-color);
  }

  .body1 {
    margin: 1rem 3rem 0 3rem;
    color: var(--white-color);
  }

  .novel-image{
    width: 12.25rem;
    height: 17.5rem;
    object-fit: cover;
    border: 0.0625rem solid var(--gray-500);
  }
`;


export const UploadInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem; 
  margin: 2rem 0;
  font-size: 1rem;
  color: var(--white-color);

  div {
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 0.4rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      right: -2.5rem; 
      top: 50%;
      transform: translate(50%, -50%);
      width: 0.0625rem;
      height: 2.8125rem;
      background-color: var(--white-color);
    }

    &:last-child::after {
      display: none;
    }
  }
`;

export const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 0.0625rem solid var(--gray-300);
  padding: 1rem 0.5rem;
  
  .author-image {
    margin-right: 1rem;
    margin-left: 2rem;
    border-radius: 50%;
    border: 0.0625rem solid var(--gray-500);
  }

  .author-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .author-name {
    font-size: var(--font-size-base);
    font-weight: 700;
  }

  .author-introduce {
    font-size: 0.875rem;
    color: var(--gray-500);
    margin-right: 2rem;
  }
`;


export const EpisodeItem = styled.div`
  display: flex;
  padding: 1rem;
  background-color: var(--white-color);
  align-items: center;

  .episode-img {
    border-radius: 0.3125rem;
    cursor: pointer;
    flex-shrink: 0; 
  }

  .episode-info {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: calc(100% - 6rem);
  }

  .episode-title {
    font-size: var(--font-size-base);
    font-weight: 700;
  }

  .episode-date {
    font-size: var(--font-size-footer);
    color: var(--gray-500);
  }
`;



"use client";

import styled from "styled-components";


export const GradientWrapper = styled.div`
  position: relative;
  background: linear-gradient(to top, var(--primary-color) 0%, var(--white-color) 90%);
  padding: 1.5rem 1rem; 
`;


export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 1rem;

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

  .cover {
    margin-bottom: 1rem;
  }

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

  h3 {
    margin-top: 2rem;
    color: var(--white-color);
    font-weight: 400;
  }

  .body1 {
    margin: 1rem 3rem 0 3rem;
    color: var(--white-color);
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
  background: var(--white-color);
  padding: 1rem;
  border-top: 1px solid var(--gray-300);
  border-bottom: 1px solid var(--gray-300);
  padding-top: 2rem;
  
  .author-image {
    margin-right: 1rem;
    margin-left: 2rem;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .author-name {
    font-size: 1rem;
    font-weight: bold;
    color: var(--gray-900);
  }

  .author-description {
    font-size: 0.875rem;
    color: var(--gray-500);
    margin-right: 3rem;
  }
`;


export const EpisodeItem = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-300);

  .episode-img {
    border-radius: 5px;
  }

  .episode-info {
    margin-left: 1rem;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  span {
    font-size: 0.875rem;
    color: #757575;
  }
`;

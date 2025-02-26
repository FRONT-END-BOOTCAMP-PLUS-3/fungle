"use client";
import styled from 'styled-components';
import Image from 'next/image';

export const Main = styled.div`
  padding: 0 1.875rem;
  margin-top: 0.625rem;
  overflow: scroll;
`;

export const EpisodeTitle = styled.h1`
  margin-top: 1.25rem;
  margin-bottom: 0.3125rem;
`;


export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-footer);
  color: var(--gray-500);
  padding: 0.9375rem 0;
  border-bottom: 0.0625rem solid var(--gray-300);
  margin-bottom: 0.9375rem;
  .author{
    font-size: var(--font-size-base);
    color: var(--gray-900);
  }
`;

export const ProfileImage = styled(Image)`
  margin-right: 0.0625rem;
  border-radius: 50%;
  border: .0625rem solid var(--gray-500);
`;

export const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.625rem;
`;

export const AuthorMeta = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-top: -0.375rem;
`;

export const Content = styled.div`
  font-size: var(--font-size-base);
  margin-bottom: 5rem;
`

export const CommentWrapper = styled.div`
  margin: 1.25rem 0; 
`;

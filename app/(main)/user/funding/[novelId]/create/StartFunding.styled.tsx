import styled from "styled-components";

export const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  padding: 0.5rem;
  text-align: center;
  box-sizing: border-box;
`;

export const ImageContainer = styled.div`
  width: 8rem;
  height: 9.75rem;
  margin: 0 auto 0.5rem;
  position: relative;
`;

export const Title = styled.h2`
  margin: 0.5rem 0 0.3rem;
  font-size: 1.25rem;
`;

export const SubTitle = styled.p`
  font-size: 0.875rem;
  color: var(--black-color);
  margin: 0 0 1rem;
  line-height: 1.3;
`;

export const Label = styled.h2`
  display: block;
  text-align: left;
  font-weight: bold;
  margin: 0.5rem 0 0.3rem;
`;

export const Amount = styled.div`
  font-size: 2rem;
  margin: 0;
  text-align: left;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 0.5rem;
`;

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

export const Label = styled.label`
  display: block;
  text-align: left;
  font-weight: bold;
`;

export const Amount = styled.p`
  font-size: 2rem;
  margin: 0;
  text-align: left;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 6rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  box-sizing: border-box;
  border: 0.0625rem solid var(--gray-300);
  border-radius: 0.375rem;
  resize: none;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

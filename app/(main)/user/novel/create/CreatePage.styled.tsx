import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;


export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  justify-content: center;
`;

export const CoverUpload = styled.div`
  width: 12.25rem;
  height: 17.1875rem;
  border: 1px solid var(--gray-300);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  cursor: pointer;
  margin: 0 auto;

  #cover-upload {
    display: none;
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.625rem;
`;

export const CreateLabel = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 700;

  .genre-max-select{
    font-size: var(--font-size-footer);
    font-weight: 100;
    color:var(--gray-300);
    margin-left: 0.3125rem;
  }
`



export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

`

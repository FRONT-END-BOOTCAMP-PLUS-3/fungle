import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 20.9375rem;
  padding: 1.25rem;
  overflow-y: scroll;
`;

export const ModalContainer = styled.div`
  width: 100%;
  .modal-checkbox{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.875rem 0;
  }
`

export const InputContainer = styled.div`
  margin: 1.25rem 0;
`


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
  gap: 0.9375rem;
  width: 100%;
`;
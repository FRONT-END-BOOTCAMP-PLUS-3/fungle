import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-y: scroll;
  `;

export const ImageContainer = styled.div`
  margin-top: 3.125rem;

  Image{
    object-fit: cover;
  }
`

export const Text = styled.p`
  font-weight: 700;
  margin-top: 1.875rem;
`

export const ButtonContainer = styled.div`
  margin-top: 3.5rem;
`
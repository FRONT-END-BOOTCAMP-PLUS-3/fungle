import styled from "styled-components";

export const Container = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  position: relative;
  margin: 1.25rem 0;
  img {
    object-fit: cover;
  }
`;
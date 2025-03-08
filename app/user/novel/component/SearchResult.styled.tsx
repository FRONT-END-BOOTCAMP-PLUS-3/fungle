import Image from "next/image";
import styled from "styled-components";

export const ResultNotfoundContainer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;  
  text-align: center;
  gap: 1.5rem;
  margin-top: 1.25rem;
  `

export const ResultImage = styled(Image)`
  object-fit: cover;
  margin-left: 1.875rem;
`;
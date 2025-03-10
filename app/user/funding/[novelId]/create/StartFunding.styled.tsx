import styled from "styled-components";

export const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
  /* 필요시 overflow-x: hidden; 추가 가능 */
`;

export const Amount = styled.p``;

export const ImageContainer = styled.div`
  width: 8rem;
  height: 9.75rem;
  margin: 0 auto;
  position: relative;
`;

export const Title = styled.h2`
  margin-top: 1rem;
  font-size: 1.25rem;
`;

export const SubTitle = styled.p`
  font-size: 0.875rem;
  color: #333;
  margin: 0.5rem 0 1.5rem;
  line-height: 1.4;
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  font-weight: bold;
  margin: 1rem 0 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  box-sizing: border-box;
  border: 0.0625rem solid #ccc;
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 6rem;
  padding: 0.75rem;
  font-size: 1rem;
  box-sizing: border-box;
  border: 0.0625rem solid #ccc;
  border-radius: 0.375rem;
  resize: none;
  &:focus {
    outline: none;
    border-color: #0f62fe;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

export const StyledButton = styled.button<{ $secondary?: boolean }>`
  flex: 1;
  margin: 0 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  color: ${(props) => (props.$secondary ? "#666" : "#fff")};
  background: ${(props) => (props.$secondary ? "#eee" : "#0f62fe")};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

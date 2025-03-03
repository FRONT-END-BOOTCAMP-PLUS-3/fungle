import styled from "styled-components";

export const ProfileSection = styled.section`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileContainer = styled.div`
  width: 6.25rem;
  display: flex;
  position: relative;

  img {
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
    border: 1px solid var(--gray-500);
    object-fit: contain;
  }

  label {
    width: 1.25rem;
    height: 1.25rem;
    bottom: 0.25rem;
    right: 0.25rem;
    position: absolute;
    border: none;
    cursor: pointer;
    background-image: url("/icon/img_plus.svg");
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
    border-radius: 50%;
    background-color: var(--white-color);
  }

  input {
    display: none;
  }
`;

export const NicknameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

export const NicknameBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const InputBox = styled.div`
  width: 6rem;

  input {
    height: 100%;
    padding: 0.3rem;
    text-align: center;
  }
`;

export const ErrorMessage = styled.p`
  font-size: var(--font-size-sm);
  color: var(--error-color);
  visibility: ${({ children }) => (children ? "visible" : "hidden")};
`;

import { styled } from "styled-components";

export const ProfileContainer = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  display: flex;
  position: relative;
  overflow: hidden;

  img {
    border-radius: 50%;
    border: 1px solid var(--gray-500);
    object-fit: cover;
    overflow: hidden;
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

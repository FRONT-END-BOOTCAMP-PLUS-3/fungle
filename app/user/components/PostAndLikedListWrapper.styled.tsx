import styled from "styled-components";
import {
  PostFooter,
  PostListWrapper,
} from "../community/components/CommunityPostList.styled";

export const PostAndLikedListWrapper = styled(PostListWrapper)`
  padding: 1rem 0;
`;

export const NoPosts = styled.p`
  display: flex;
  text-align: center;
  align-self: center;
  padding: 1rem;
`;

export const CustomPostFooter = styled(PostFooter)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

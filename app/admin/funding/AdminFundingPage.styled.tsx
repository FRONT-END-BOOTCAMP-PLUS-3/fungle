import styled from "styled-components";
import { Table } from "../AdminPage.styled";

export const FundingTable = styled(Table)`
  .introduce {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-word;
    padding: 0.5rem;
    box-sizing: border-box;
  }
`;

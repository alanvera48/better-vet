import styled from "styled-components";

export const Divider = styled.div`
  background-color: #dadce0;
  height: 1px;
  with: 100%;
  margin: 10px 0;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  color: #202124;
  font-family: Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  padding-top: 8px;
  padding-bottom: 8px;
  > span {
    margin-left: 10px;
  }
`;

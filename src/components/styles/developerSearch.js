import styled from "styled-components"

export const StyledDeveloperSearchCardDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px;
  border: 2px gray dashed;
  margin: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "lightgray" : "white")};
  &:hover {
    background: lightgray;
  }
`

export const StyledLabel = styled.div`
  margin-right: 10px;
`

export const StyledDeveloperSearchDiv = styled.div`
  height: 36em;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15;
`
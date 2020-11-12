import React from 'react';
import styled from 'styled-components';
import A from "./../atoms/index";

const StyledContentEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 20rem;
`;

const ContentEmpty = () => {
    return (
        <StyledContentEmpty>
          <A.Text fontSize={"2rem"} color={"darkGrey"}>
            <A.Icon name={"alert"} color={"darkGrey"}></A.Icon>
          </A.Text>
          <A.Text></A.Text>
          <A.Text fontSize={"2rem"}>No results matched your search.</A.Text>
        </StyledContentEmpty>
    )
}

export default ContentEmpty;
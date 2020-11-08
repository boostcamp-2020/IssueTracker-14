import React from "react";
import styled from "styled-components";
import Button from "./../atoms/Button";

const StyledNewIssueButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;

const NewIssueButton = () => (
    <StyledNewIssueButton>
        <Button  color={"white"} backgroundColor={"green"} width={"8rem"} height={"2rem"} border={true}>
          New Issue
        </Button>
    </StyledNewIssueButton>
);

export default NewIssueButton;

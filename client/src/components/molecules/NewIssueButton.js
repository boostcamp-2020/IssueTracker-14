import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "./../atoms/Button";

const StyledNewIssueButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewIssueButton = () => {
  const history = useHistory();

  const onClick = () => {
    history.push("/issues/new");
  };

  return (
    <StyledNewIssueButton>
      <Button
        color={"white"}
        backgroundColor={"green"}
        width={"8rem"}
        height={"2rem"}
        border={true}
        onClick={onClick}
      >
        New Issue
      </Button>
    </StyledNewIssueButton>
  );
};

export default NewIssueButton;

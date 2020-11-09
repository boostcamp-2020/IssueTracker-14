import React from "react";
import styled from "styled-components";
import Button from "./../atoms/Button";

const StyledNewMilestoneButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewMilestoneButton = ({ children }) => (
  <StyledNewMilestoneButton>
    <Button
      color={"white"}
      backgroundColor={"green"}
      width={"8rem"}
      height={"2rem"}
      border={true}
    >
      {children}
    </Button>
  </StyledNewMilestoneButton>
);

export default NewMilestoneButton;

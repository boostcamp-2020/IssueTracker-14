import React, { useCallback } from "react";
import FormDiv from "../molecules/FormDiv";
import NewMilestoneButton from "../molecules/NewMilestoneButton";
import styled from "styled-components";

const StyledNewMilestoneForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NewMilestoneForm = () => {
  return (
    <StyledNewMilestoneForm>
      <FormDiv label={"title"} for={"title-id"} type={"text"} name={"title"} />
      <FormDiv
        label={"Due date"}
        for={"Due-date"}
        type={"text"}
        name={"Due-date"}
      />
      <FormDiv
        label={"Description"}
        for={"Description"}
        type={"text"}
        name={"Description"}
      />
      <NewMilestoneButton>Create Milestone</NewMilestoneButton>
    </StyledNewMilestoneForm>
  );
};

export default NewMilestoneForm;

import React from "react";
import styled from "styled-components";
import Dropdown from "../molecules/Dropdown";

const StyledNewIssueOptions = styled.div``;

const NewIssueOptions = () => {
  return (
    <StyledNewIssueOptions>
      <Dropdown
        buttonData={[]}
        buttonText={"Assignees"}
        labelText={"Assign up to 10 people to this issue"}
        buttonWidth={"100%"}
        showDropdown={"none"}
        search={true}
        icon={"cog"}
      >
        No one - assign yourself
      </Dropdown>
    </StyledNewIssueOptions>
  );
};

export default NewIssueOptions;

import React from "react";
import styled from "styled-components";
import DropdownWithText from "../molecules/DropdownWithText";

const StyledNewIssueOptions = styled.div``;

const NewIssueOptions = () => {
  return (
    <StyledNewIssueOptions>
      <DropdownWithText
        buttonData={[]}
        buttonText={"Assignees"}
        labelText={"Assign up to 10 people to this issue"}
        showDropdown={"none"}
        search={true}
        icon={"cog"}
        text={"No one - assign Yourself"}
        fontSize={"0.8rem"}
      />
      <DropdownWithText
        buttonData={[]}
        buttonText={"Labels"}
        labelText={"Apply Label to this issue"}
        showDropdown={"none"}
        search={true}
        icon={"cog"}
        text={"None yet"}
        fontSize={"0.8rem"}
      />
      <DropdownWithText
        buttonData={[]}
        buttonText={"Milestone"}
        labelText={"Set milestone"}
        showDropdown={"none"}
        search={true}
        icon={"cog"}
        text={"No milestone"}
        fontSize={"0.8rem"}
      />
    </StyledNewIssueOptions>
  );
};

export default NewIssueOptions;

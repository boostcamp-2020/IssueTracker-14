import React from "react";
import styled from "styled-components";
import M from "../molecules/index";

const StyledNewIssueOptions = styled.div``;

const IssueOptions = [
  {
    buttonData: [],
    buttonText: "Assignees",
    labelText: "Assign up to 10 people to this issue",
    text: "No one - assign Yourself",
  },
  {
    buttonData: [],
    buttonText: "Labels",
    labelText: "Apply Label to this issue",
    text: "None yet",
  },
  {
    buttonData: [],
    buttonText: "Milestone",
    labelText: "Set milestone",
    text: "No milestone",
  },
];

const NewIssueOptions = () => {
  return (
    <StyledNewIssueOptions>
      {IssueOptions.map(({ buttonData, buttonText, labelText, text }, idx) => {
        return (
          <M.DropdownWithText
            key={idx}
            buttonData={buttonData}
            buttonText={buttonText}
            labelText={labelText}
            showDropdown={"none"}
            search={true}
            icon={"cog"}
            text={text}
            fontSize={"0.8rem"}
          />
        );
      })}
    </StyledNewIssueOptions>
  );
};

export default NewIssueOptions;

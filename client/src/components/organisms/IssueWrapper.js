import React from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import O from "../organisms/index";

const StyledIssueWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0rem 1.5rem 0rem;
  width: 100%;
`;

const StyledIssueMenuWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #000000;
  padding: 0rem 1rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const issueDropdownOptions = [
  {
    buttonData: [],
    buttonText: "Author",
    labelText: "Filter by author",
    buttonWidth: "5rem",
    showDropdown: "none",
  },
  {
    buttonData: [],
    buttonText: "Label",
    labelText: "Filter by label",
    buttonWidth: "5rem",
    showDropdown: "none",
  },
  {
    buttonData: [],
    buttonText: "Milestones",
    labelText: "Filter by milestone",
    buttonWidth: "7rem",
    showDropdown: "none",
  },
  {
    buttonData: [],
    buttonText: "Assignee",
    labelText: "Filter by who's assigned",
    buttonWidth: "7rem",
    showDropdown: "none",
  },
];

const IssueWrapper = () => (
  <StyledIssueWrapper>
    <M.ClearIssueFilter />
    <StyledIssueMenuWrapper>
      <A.Checkbox />
      <O.DropdownCluster dropdownOptions={issueDropdownOptions} />
    </StyledIssueMenuWrapper>
  </StyledIssueWrapper>
);

export default IssueWrapper;

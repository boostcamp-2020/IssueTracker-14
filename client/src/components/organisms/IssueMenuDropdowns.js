import React from "react";
import styled from "styled-components";
import M from "../molecules/index";

const StyledDropdownCluster = styled.div`
  position: relative;
  display: flex;
`;

const data = [
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

const IssueMenuDropdownCluster = ({ dropdownOptions }) => (
  <StyledDropdownCluster>
    {data.map((el, idx) => (
      <M.Dropdown key={idx} {...el} />
    ))}
  </StyledDropdownCluster>
);

export default IssueMenuDropdownCluster;

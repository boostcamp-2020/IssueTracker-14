import React from 'react';
import styled from 'styled-components';
import A from './../atoms/index';
import M from './../molecules/index';
import O from './../organisms/index';

const StyledIssueMenuWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
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
    },
    {
      buttonData: [],
      buttonText: "Label",
      labelText: "Filter by label",
      buttonWidth: "5rem",
    },
    {
      buttonData: [],
      buttonText: "Milestones",
      labelText: "Filter by milestone",
      buttonWidth: "7rem",
    },
    {
      buttonData: [],
      buttonText: "Assignee",
      labelText: "Filter by who's assigned",
      buttonWidth: "7rem",
    },
    {
      buttonData: [{name: "Newest"}, {name: "Oldest"}, {name: "Most commented"}, {name: "Least commented"}, {name: "Recently updated"}, {name: "Least recently updated"},],
      buttonText: "Sort",
      labelText: "Sort by",
      buttonWidth: "5rem",
      search: false
    },
];

const IssueMenu = () => {
    return (
    <StyledIssueMenuWrapper>
      <A.Checkbox />
      <O.DropdownCluster dropdownOptions={issueDropdownOptions} />
    </StyledIssueMenuWrapper>
    )
}

export default IssueMenu
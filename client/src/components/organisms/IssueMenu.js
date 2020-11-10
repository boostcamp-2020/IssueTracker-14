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
      buttonData: [{title: "Newest", id: "id1"}, {title: "Oldest", id: "id2"}, {title: "Most commented", id: "id3"}, {title: "Least commented", id: "id4"}, {title: "Recently updated", id: "id5"}, {title: "Least recently updated", id: "id6"},],
      buttonText: "Sort",
      labelText: "Sort by",
      buttonWidth: "5rem",
      search: true
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
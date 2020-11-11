import React from "react";
import styled from "styled-components";
import A from "./../atoms/index";
import M from "./../molecules/index";
import O from "./../organisms/index";

import { useLabelState, useLabelDispatch } from "../../stores/label";
import { useAssigneeState, useAssigneeDispatch } from "../../stores/assignee";
import { useIssueState, useIssueDispatch } from "../../stores/issue";

import fetchTargetData from "../../utils/fetchData";

const StyledIssueMenuWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const IssueMenu = ({ issueCount }) => {
  const milestoneState = useMilestoneState();
  const milestoneDispatch = useMilestoneDispatch();

  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();

  const assigneeState = useAssigneeState();
  const assigneeDispatch = useAssigneeDispatch();

  const issueState = useIssueState();
  const issueDispatch = useIssueDispatch();

  const issueDropdownOptions = [
    {
      buttonData: assigneeState.users,
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
      buttonData: [
        { title: "Newest", id: "id1" },
        { title: "Oldest", id: "id2" },
        { title: "Most commented", id: "id3" },
        { title: "Least commented", id: "id4" },
        { title: "Recently updated", id: "id5" },
        { title: "Least recently updated", id: "id6" },
      ],
      buttonText: "Sort",
      labelText: "Sort by",
      buttonWidth: "5rem",
      search: true,
    },
  ];

  return (
    <StyledIssueMenuWrapper>
      <A.Checkbox />
      <span>{issueCount.open}</span>
      <span>{issueCount.closed}</span>
      <O.DropdownCluster dropdownOptions={issueDropdownOptions} />
    </StyledIssueMenuWrapper>
  );
};

export default IssueMenu;

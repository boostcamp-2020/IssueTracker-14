import React, { useEffect } from "react";
import styled from "styled-components";
import A from "./../atoms/index";
import M from "./../molecules/index";
import O from "./../organisms/index";

import { useLabelState, useLabelDispatch } from "../../stores/label";
import { useAssigneeState, useAssigneeDispatch } from "../../stores/assignee";
import { useIssueState, useIssueDispatch } from "../../stores/issue";
import {
  useMilestoneState,
  useMilestoneDispatch,
} from "../../stores/milestone";
import { useQueryState, useQueryDispatch } from "../../stores/query";

import fetchTargetData from "../../utils/fetchData";

const StyledIssueMenuWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const IssueMenu = ({
  selected,
  setSelected,
  totalSelected,
  setTotalSelected,
}) => {
  const milestoneState = useMilestoneState();
  const milestoneDispatch = useMilestoneDispatch();

  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();

  const assigneeState = useAssigneeState();
  const assigneeDispatch = useAssigneeDispatch();

  const issueState = useIssueState();

  const queryDispatch = useQueryDispatch();

  const issueDropdownOptions = [
    {
      buttonData: assigneeState.users.map((el) => {
        return {
          ...el,
          dispatchData: () => {
            queryDispatch({ type: "CHANGE_AUTHOR", data: el.nickname });
          },
        };
      }),
      buttonText: "Author",
      labelText: "Filter by author",
      buttonWidth: "5rem",
      fetchData: () => {
        fetchTargetData("user/all", assigneeDispatch);
      },
    },
    {
      buttonData: labelState.labels.map((el) => {
        return {
          ...el,
          dispatchData: () => {
            queryDispatch({ type: "CHANGE_LABEL", data: el.title });
          },
        };
      }),
      buttonText: "Label",
      labelText: "Filter by label",
      buttonWidth: "5rem",
      fetchData: () => {
        fetchTargetData("label", labelDispatch);
      },
    },
    {
      buttonData: milestoneState.milestones.map((el) => {
        return {
          ...el,
          dispatchData: () => {
            queryDispatch({ type: "CHANGE_MILESTONE", data: el.title });
          },
        };
      }),
      buttonText: "Milestones",
      labelText: "Filter by milestone",
      buttonWidth: "7rem",
      fetchData: () => {
        fetchTargetData("milestone", milestoneDispatch);
      },
    },
    {
      buttonData: assigneeState.users.map((el) => {
        return {
          ...el,
          dispatchData: () => {
            queryDispatch({ type: "CHANGE_ASSIGNEE", data: el.title });
          },
        };
      }),
      buttonText: "Assignee",
      labelText: "Filter by who's assigned",
      buttonWidth: "7rem",
      fetchData: () => {
        fetchTargetData("user/all", assigneeDispatch);
      },
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

  const onClickIssueOpen = () => {
    queryDispatch({ type: "CHANGE_STATUS", data: "open" });
  };

  const onClickIssueClosed = () => {
    queryDispatch({ type: "CHANGE_STATUS", data: "closed" });
  };

  const onClickTotalCheckbox = () => {
    totalSelected === false ? setTotalSelected(true) : setTotalSelected(false);
  };

  // TODO: OPEN CLOSED BUTTON STYLING
  return (
    <StyledIssueMenuWrapper>
      {issueState.length > selected.length && selected.length > 0 ? (
        <A.Icon />
      ) : (
        <A.Checkbox onClick={onClickTotalCheckbox} />
      )}
      <span>{selected.length} selected</span>
      {/* <span>{selected.length === 0 ? "" : selected.length + " selected"
    
    '}</span> */}
      <A.Button onClick={onClickIssueOpen}>
        {issueState.issueCount?.open}
      </A.Button>
      <A.Button onClick={onClickIssueClosed}>
        {issueState.issueCount?.closed}
      </A.Button>
      <O.DropdownCluster dropdownOptions={issueDropdownOptions} />
    </StyledIssueMenuWrapper>
  );
};

export default IssueMenu;
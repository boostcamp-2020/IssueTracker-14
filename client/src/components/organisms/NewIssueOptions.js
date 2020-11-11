import React from "react";
import styled from "styled-components";
import M from "../molecules/index";
import {
  useMilestoneState,
  useMilestoneDispatch,
} from "../../stores/milestone";
import { useLabelState, useLabelDispatch } from "../../stores/label";
import { useAssigneeState, useAssigneeDispatch } from "../../stores/assignee";
import { useIssueState, useIssueDispatch } from "../../stores/issue";

import fetchTargetData from "../../utils/fetchData";

const StyledNewIssueOptions = styled.div`
  width: 20vw;
`;

const NewIssueOptions = () => {
  const milestoneState = useMilestoneState();
  const milestoneDispatch = useMilestoneDispatch();

  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();

  const assigneeState = useAssigneeState();
  const assigneeDispatch = useAssigneeDispatch();

  const issueState = useIssueState();
  const issueDispatch = useIssueDispatch();

  const IssueOptions = [
    {
      buttonData: assigneeState.users.map((el) => {
        return {
          ...el,
          dispatchData: () => {
            issueDispatch({ type: "ADD_ASSIGNEE", data: el.id });
          },
        };
      }),
      buttonText: "Assignees",
      labelText: "Assign up to 10 people to this issue",
      selected:
        assigneeState.users.filter((user) => {
          return issueState.newIssue.assigneeIdList.includes(user.id);
        }) || [],
      defaultText: "No one - assign yourself",
      fetchData: () => {
        fetchTargetData("user/all", assigneeDispatch);
      },
    },
    {
      buttonData: labelState.labels.map((el) => {
        return {
          ...el,
          dispatchData: () => {
            issueDispatch({ type: "ADD_LABEL", data: el.id });
          },
        };
      }),
      buttonText: "Labels",
      labelText: "Apply Label to this issue",
      selected:
        labelState.labels.filter((label) => {
          return issueState.newIssue.labelIdList.includes(label.id);
        }) || [],
      defaultText: "None yet",
      fetchData: () => {
        fetchTargetData("label", labelDispatch);
      },
    },
    {
      buttonData: milestoneState.milestones.map((el) => {
        return {
          ...el,
          dispatchData: () => {
            issueDispatch({ type: "ADD_MILESTONE", data: el.id });
          },
        };
      }),
      buttonText: "Milestone",
      labelText: "Set milestone",
      selected:
        milestoneState.milestones.filter((milestone) => {
          return issueState.newIssue.milestoneid === milestone.id;
        }) || [],
      defaultText: "No milestone",
      fetchData: () => {
        fetchTargetData("milestone", milestoneDispatch);
      },
    },
  ];

  return (
    <StyledNewIssueOptions>
      {IssueOptions.map(
        (
          {
            buttonData,
            buttonText,
            labelText,
            selected,
            defaultText,
            fetchData,
          },
          idx
        ) => {
          return (
            <M.DropdownWithText
              key={idx}
              optionId={idx}
              buttonData={buttonData}
              buttonText={buttonText}
              labelText={labelText}
              showDropdown={"none"}
              search={true}
              icon={"cog"}
              selected={selected}
              defaultText={defaultText}
              fontSize={"0.8rem"}
              fetchData={fetchData}
            />
          );
        }
      )}
    </StyledNewIssueOptions>
  );
};

export default NewIssueOptions;

import React from "react";
import styled from "styled-components";
import M from "../molecules/index";
import {
  useMilestoneState,
  useMilestoneDispatch,
} from "../../stores/milestone";
import { useLabelState, useLabelDispatch } from "../../stores/label";
import { useAssigneeState, useAssigneeDispatch } from "../../stores/assignee";

import fetchTargetData from "../../utils/fetchData";

const StyledNewIssueOptions = styled.div``;

const NewIssueOptions = () => {
  const milestoneState = useMilestoneState();
  const milestoneDispatch = useMilestoneDispatch();

  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();

  const assigneeState = useAssigneeState();
  const assigneeDispatch = useAssigneeDispatch();

  const IssueOptions = [
    {
      buttonData: assigneeState.users,
      buttonText: "Assignees",
      labelText: "Assign up to 10 people to this issue",
      text: "No one - assign Yourself",
      fetchData: () => {
        fetchTargetData("user/all", assigneeDispatch);
      },
    },
    {
      buttonData: labelState.labels,
      buttonText: "Labels",
      labelText: "Apply Label to this issue",
      text: "None yet",
      fetchData: () => {
        fetchTargetData("label", labelDispatch);
      },
    },
    {
      buttonData: milestoneState.milestones,
      buttonText: "Milestone",
      labelText: "Set milestone",
      text: "No milestone",
      fetchData: () => {
        fetchTargetData("milestone", milestoneDispatch);
      },
    },
  ];

  return (
    <StyledNewIssueOptions>
      {IssueOptions.map(
        ({ buttonData, buttonText, labelText, text, fetchData }, idx) => {
          console.log(buttonData);
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
              fetchData={fetchData}
            />
          );
        }
      )}
    </StyledNewIssueOptions>
  );
};

export default NewIssueOptions;

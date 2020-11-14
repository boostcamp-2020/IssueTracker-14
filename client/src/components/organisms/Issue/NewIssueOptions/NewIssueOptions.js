import React, { useEffect } from "react";
import M from "@molecules/index";
import Store from "@stores/index";
import fetchTargetData from "@utils/fetchData";
import Styled from "./NewIssueOptions.style";

const NewIssueOptions = () => {
  const milestoneState = Store.useMilestoneState();
  const milestoneDispatch = Store.useMilestoneDispatch();

  const labelState = Store.useLabelState();
  const labelDispatch = Store.useLabelDispatch();

  const assigneeState = Store.useAssigneeState();
  const assigneeDispatch = Store.useAssigneeDispatch();

  const issueState = Store.useIssueState();
  const issueDispatch = Store.useIssueDispatch();

  useEffect(() => {
    fetchTargetData("/user/all", assigneeDispatch);
  }, []);

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
    <Styled.NewIssueOptions>
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
    </Styled.NewIssueOptions>
  );
};

export default NewIssueOptions;

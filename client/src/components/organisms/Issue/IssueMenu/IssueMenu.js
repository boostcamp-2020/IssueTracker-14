import React, { useState, useEffect } from "react";
import A from "@atoms/index";
import M from "@molecules/index";
import Store from "@stores/index";
import fetchTargetData from "@utils/fetchData";
import Styled from "./IssueMenu.style";

const IssueMenu = ({
  selected,
  setSelected,
  totalSelected,
  setTotalSelected,
}) => {
  const [currentStataus, setCurrentStataus] = useState("open");

  useEffect(() => {
    setSelected([]);
  }, [currentStataus]);

  const milestoneState = Store.useMilestoneState();
  const milestoneDispatch = Store.useMilestoneDispatch();

  const labelState = Store.useLabelState();
  const labelDispatch = Store.useLabelDispatch();

  const assigneeState = Store.useAssigneeState();
  const assigneeDispatch = Store.useAssigneeDispatch();

  const issueState = Store.useIssueState();
  const issueDispatch = Store.useIssueDispatch();

  const queryState = Store.useQueryState();
  const queryDispatch = Store.useQueryDispatch();

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
      search: false,
    },
  ];

  const oneDropdownOption = {
    buttonData: [
      {
        title: "Open",
        dispatchData: () => {
          issueDispatch({
            type: "UPDATE_ISSUE_STATUS",
            status: "open",
            array: selected,
          });
        },
      },
      {
        title: "Closed",
        dispatchData: () => {
          issueDispatch({
            type: "UPDATE_ISSUE_STATUS",
            status: "closed",
            array: selected,
          });
        },
      },
    ],
    search: false,
    buttonText: "Mark as",
    labelText: "Actions",
    buttonWidth: "5rem",
  };

  const onClickIssueOpen = () => {
    setCurrentStataus("open");
    queryDispatch({ type: "CHANGE_STATUS", data: "open" });
  };

  const onClickIssueClosed = () => {
    setCurrentStataus("closed");
    queryDispatch({ type: "CHANGE_STATUS", data: "closed" });
  };

  const onClickTotalCheckbox = () => {
    if (totalSelected) {
      setTotalSelected(false);
    } else {
      setTotalSelected(true);
    }
  };

  return (
    <Styled.IssueMenuWrapper>
      <Styled.ButtonWrapper>
        {issueState.issues.length !== selected.length &&
        selected.length !== 0 ? (
          <A.Text fontSize={"0.6rem"}>
            <A.Icon distance={"0"} name="checkDouble" />
          </A.Text>
        ) : (
          <A.Checkbox checked={totalSelected} onClick={onClickTotalCheckbox} />
        )}
        {selected.length !== 0 ? (
          <A.Text fontSize={"small"}>{selected.length} selected</A.Text>
        ) : (
          <>
            <A.Button onClick={onClickIssueOpen}>
              <Styled.ContentWrapper>
                <A.Text
                  fontSize={"medium"}
                  color={
                    queryState.query.status === "open" ? "black" : "darkGrey"
                  }
                >
                  <A.Icon
                    name={"alert"}
                    color={
                      queryState.query.status === "open" ? "green" : "darkGrey"
                    }
                  />
                  {issueState.issueCount?.open} Open
                </A.Text>
              </Styled.ContentWrapper>
            </A.Button>
            <A.Button onClick={onClickIssueClosed}>
              <Styled.ContentWrapper>
                <A.Text
                  fontSize={"medium"}
                  color={
                    queryState.query.status === "closed" ? "black" : "darkGrey"
                  }
                >
                  <A.Icon
                    name={"alert"}
                    color={
                      queryState.query.status === "closed" ? "red" : "darkGrey"
                    }
                  />
                  {issueState.issueCount?.closed} Closed
                </A.Text>
              </Styled.ContentWrapper>
            </A.Button>
          </>
        )}
      </Styled.ButtonWrapper>
      {selected.length !== 0 ? (
        <M.Dropdown {...oneDropdownOption} />
      ) : (
        <Styled.DropdownCluster>
          {issueDropdownOptions.map((el, idx) => (
            <M.Dropdown key={idx} {...el} />
          ))}
        </Styled.DropdownCluster>
      )}
    </Styled.IssueMenuWrapper>
  );
};

export default IssueMenu;

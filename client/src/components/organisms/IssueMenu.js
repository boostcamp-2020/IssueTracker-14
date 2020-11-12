import React, { useState, useEffect } from "react";
import styled from "styled-components";
import A from "./../atoms/index";
import M from "./../molecules/index";
import O from "./../organisms/index";
import Store from "../../stores/index";
import fetchTargetData from "../../utils/fetchData";

const StyledIssueMenuWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 15rem;
`;

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
      search: true,
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
    <StyledIssueMenuWrapper>
      <StyledButtonWrapper>
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
              <StyledContentWrapper>
                <A.Text
                  fontSize={"medium"}
                  color={queryState.query.status === "open" ? "black" : "grey"}
                >
                  <A.Icon
                    name={"alert"}
                    color={
                      queryState.query.status === "open" ? "green" : "grey"
                    }
                  />
                  {issueState.issueCount?.open} Open
                </A.Text>
              </StyledContentWrapper>
            </A.Button>
            <A.Button onClick={onClickIssueClosed}>
              <StyledContentWrapper>
                <A.Text
                  fontSize={"medium"}
                  color={
                    queryState.query.status === "closed" ? "black" : "grey"
                  }
                >
                  <A.Icon
                    name={"alert"}
                    color={
                      queryState.query.status === "closed" ? "red" : "grey"
                    }
                  />
                  {issueState.issueCount?.closed} Closed
                </A.Text>
              </StyledContentWrapper>
            </A.Button>
          </>
        )}
      </StyledButtonWrapper>
      {selected.length !== 0 ? (
        <M.Dropdown {...oneDropdownOption} />
      ) : (
        <O.DropdownCluster dropdownOptions={issueDropdownOptions} />
      )}
    </StyledIssueMenuWrapper>
  );
};

export default IssueMenu;

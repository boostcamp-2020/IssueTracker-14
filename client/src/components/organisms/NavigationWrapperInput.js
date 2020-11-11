import React, { useState } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import { useQueryState, useQueryDispatch } from "../../stores/query";

const StyledNavigationWrapperInput = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const queryStringify = (query) => {
  const queryAuthor = query.author ? ` author: ${query.author}` : "";
  const queryLabel = (() => {
    if (query.label.length !== 0) {
      return query.label.reduce((acc, label) => {
        return acc + ` label: ${label}`;
      }, "");
    }
    return "";
  })();
  const queryAssignee = query.assignee ? ` assignee: ${query.assignee}` : "";
  const queryMilestone = query.milestone
    ? ` milestone: ${query.milestone}`
    : "";
  return `is: ${query.status}${queryAuthor}${queryLabel}${queryAssignee}${queryMilestone}`;
};

const queryParser = (query) => {};

const NavigationWrapperInput = () => {
  const queryState = useQueryState();
  const queryDispatch = useQueryDispatch();

  const [inputValue, setInputValue] = useState(
    queryStringify(queryState.query)
  );

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  // TODO: value로 query parser 거치고 dispatch change_value

  const inputFilterButtons = [
    {
      id: 1,
      title: "Open issues",
      dispatchData: () => {
        queryDispatch({ type: "CHANGE_STATUS", data: "open" });
      },
    },
    {
      id: 2,
      title: "Your issues",
      dispatchData: () => {
        queryDispatch({
          type: "CHANGE_AUTHOR",
          data: localStorage.getItem("nickname"),
        });
      },
    },
    {
      id: 3,
      title: "Everything assigned to you",
      dispatchData: () => {
        queryDispatch({
          type: "CHANGE_ASSIGNEE",
          data: localStorage.getItem("nickname"),
        });
      },
    },
    {
      id: 4,
      title: "Closed issues",
      dispatchData: () => {
        queryDispatch({ type: "CHANGE_STATUS", data: "closed" });
      },
    },
  ];

  // TODO: enter event 로 setQuery dispatch
  return (
    <StyledNavigationWrapperInput>
      <M.Dropdown
        buttonData={inputFilterButtons}
        buttonText={"Filters"}
        labelText={"Filter Issues"}
        buttonWidth={"5rem"}
        reverse={false}
        border={true}
        search={false}
      />
      <A.Input
        margin="0rem"
        padding={"0.5rem 0rem"}
        display={"table-cell"}
        width={"100%"}
        value={inputValue}
        onChange={onChangeHandler}
      />
    </StyledNavigationWrapperInput>
  );
};

export default NavigationWrapperInput;

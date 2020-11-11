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
  return `status: ${query.status}${queryAuthor}${queryLabel}${queryAssignee}${queryMilestone}`;
};

const queryParser = (inputValue) => {
  const changedQueryState = {
    status: "open",
    author: "",
    label: [],
    assignee: "",
    milestone: "",
  };
  const splitedInputValue = inputValue.replace(/ /g, "").split(";");
  splitedInputValue.forEach((el) => {
    const [key, value] = el.split(":");
    if (key !== "label") {
      changedQueryState[key] = value;
    }
    if (key == "label" && !changedQueryState["label"].includes(value)) {
      changedQueryState[key].push(value);
    }
  });
  return changedQueryState;
};

const NavigationWrapperInput = () => {
  const queryState = useQueryState();
  const queryDispatch = useQueryDispatch();

  const [inputValue, setInputValue] = useState(
    queryStringify(queryState.query)
  );

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onKeyDownHandler = (event) => {
    if (event.which === 13) {
      console.log(inputValue);
      console.log("entered");
      queryDispatch({ type: "CHANGE_VALUE", data: queryParser(inputValue) });
    }
  };

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
        onKeyDown={onKeyDownHandler}
      />
    </StyledNavigationWrapperInput>
  );
};

export default NavigationWrapperInput;

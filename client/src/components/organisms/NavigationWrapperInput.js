import React, { useState } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";

const StyledNavigationWrapperInput = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const inputFilterButtons = [
  { id: 1, title: "Open issues", onClick: () => {} },
  { id: 2, title: "Your issues", onClick: () => {} },
  { id: 3, title: "Everything assigned to you", onClick: () => {} },
  { id: 4, title: "Everything mentioning you", onClick: () => {} },
  { id: 5, title: "Closed issues", onClick: () => {} },
];

const queryParser = (query) => {
  const queryAuthor = query.author ? `author: ${query.author}` : "";
  const queryLabel = (() => {
    if (query.label.length !== 0) {
      return query.label.reduce((acc, label) => {
        return acc + `label: ${label}`;
      }, "");
    }
    return "";
  })();
  const queryAssignee = query.assignee ? `assignee: ${query.assignee}` : "";
  const queryMilestone = query.milestone ? `milestone: ${query.milestone}` : "";
  return `is: ${query.status} ${queryAuthor} ${queryLabel} ${queryAssignee} ${queryMilestone}`;
};

const NavigationWrapperInput = ({ query, setQuery }) => {
  const [inputValue, setInputValue] = useState(queryParser(query));
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  // TODO: enter event 로 setQuery
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

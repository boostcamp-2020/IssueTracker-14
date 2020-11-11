import React from "react";
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

const NavigationWrapperInput = () => (
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
    />
  </StyledNavigationWrapperInput>
);

export default NavigationWrapperInput;

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
  { name: "Open issues", onClick: () => {} },
  { name: "Your issues", onClick: () => {} },
  { name: "Everything assigned to you", onClick: () => {} },
  { name: "Everything mentioning you", onClick: () => {} },
  { name: "Closed issues", onClick: () => {} },
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

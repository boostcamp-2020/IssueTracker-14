import React from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import Dropdown from "../molecules/Dropdown";

const StyledNavigationWrapperInput = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  flex: auto;
`;

const inputFilterButtons = [
    { name: "Open issues", onClick: () => {} },
    { name: "Your issues", onClick: () => {} },
    { name: "Everything assigned to you", onClick: () => {} },
    { name: "Everything mentioning you", onClick: () => {} },
    { name: "Closed issues", onClick: () => {} }
]

const NavigationWrapperInput = () => (
    <StyledNavigationWrapperInput>
        <Dropdown buttonData={inputFilterButtons} buttonText={"Filters"} labelText={"Filter Issues"} buttonWidth={"5rem"} reverse={false} border={true} />
        <Input margin="0rem" padding={"0.5rem 0rem"} display={"table-cell"} width={"100%"} />
    </StyledNavigationWrapperInput>
);

export default NavigationWrapperInput;

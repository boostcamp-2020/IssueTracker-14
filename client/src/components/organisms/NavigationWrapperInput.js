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
        <Dropdown buttonData={inputFilterButtons} buttonText={"Filters"} labelText={"Filter Issues"} buttonWidth={"5rem"} />
        <Input margin="0rem" padding={"0.5rem 0rem"} width={"36rem"} />
    </StyledNavigationWrapperInput>
);

export default NavigationWrapperInput;

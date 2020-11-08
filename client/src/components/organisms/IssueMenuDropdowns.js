import React from "react";
import styled from "styled-components";
import Dropdown from "../molecules/Dropdown";

const StyledDropdowns = styled.div`
  position: relative;
  display: flex;
`;

const IssueMenuDropdowns = () => (
    <StyledDropdowns>
        <Dropdown buttonData={[]} buttonText={"Author"} labelText={"Filter by author"} buttonWidth={"5rem"} showDropdown={"none"} />
        <Dropdown buttonData={[]} buttonText={"Label"} labelText={"Filter by label"} buttonWidth={"5rem"} showDropdown={"none"} />
        <Dropdown buttonData={[]} buttonText={"Milestones"} labelText={"Filter by milestone"} buttonWidth={"7rem"} showDropdown={"none"} />
        <Dropdown buttonData={[]} buttonText={"Assignee"} labelText={"Filter by who's assigned"} buttonWidth={"7rem"} showDropdown={"none"} />
    </StyledDropdowns>
);

export default IssueMenuDropdowns;
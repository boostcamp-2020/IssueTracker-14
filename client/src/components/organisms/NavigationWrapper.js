import React from "react";
import NavigationWrapperInput from "./NavigationWrapperInput";
import NavigationWrapperLink from "./../molecules/NavigationWrapperLink";
import NewIssueButton from "./../molecules/NewIssueButton";
import styled from "styled-components";

const StyledNavigationWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const NavigationWrapper = () => (
    <StyledNavigationWrapper>
        <NavigationWrapperInput />
        <NavigationWrapperLink />
        <NewIssueButton />
    </StyledNavigationWrapper>
);

export default NavigationWrapper;

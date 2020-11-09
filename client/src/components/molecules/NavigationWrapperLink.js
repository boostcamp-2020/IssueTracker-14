import React from "react";
import styled from "styled-components";
import Icon from "./../atoms/Icon";
import Button from "./../atoms/Button";

const StyledNavigationWrapperLink = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;

const NavigationWrapperLink = () => (
  <StyledNavigationWrapperLink>
    <Button border={true} rounded={false} width={"8rem"} height={"2rem"}>
      <Icon name={"label"} /> Label
    </Button>
    <Button border={true} rounded={false} width={"9rem"} height={"2rem"}>
      <Icon name={"milestone"} /> Milestone
    </Button>
  </StyledNavigationWrapperLink>
);

export default NavigationWrapperLink;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import A from "../atoms/index";

const StyledNavigationWrapperLink = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
`;

const NavigationWrapperLink = () => (
  <StyledNavigationWrapperLink>
    <A.Button border={true} rounded={false} width={"8rem"} height={"2rem"}>
      <A.Icon name={"label"} /> Label
    </A.Button>
    <Link to={"/milestones/new"} style={{ textDecoration: "none" }}>
      <A.Button border={true} rounded={false} width={"9rem"} height={"2rem"}>
        <A.Icon name={"milestone"} /> Milestone
      </A.Button>
    </Link>
  </StyledNavigationWrapperLink>
);

export default NavigationWrapperLink;

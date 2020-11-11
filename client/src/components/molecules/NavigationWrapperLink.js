import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import A from "../atoms/index";

import { useLabelState } from "../../stores/label";
import { useMilestoneState } from "../../stores/milestone";

const StyledNavigationWrapperLink = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;

const NavigationWrapperLink = () => {
  const labelState = useLabelState();
  const milestoneState = useMilestoneState();
  return (
    <StyledNavigationWrapperLink>
      <A.Button border={true} rounded={false} width={"8rem"} height={"2rem"}>
        <A.Icon name={"label"} /> Label
        <span>{labelState?.labels?.length}</span>
      </A.Button>
      <Link to={"/milestones/new"} style={{ textDecoration: "none" }}>
        <A.Button border={true} rounded={false} width={"9rem"} height={"2rem"}>
          <A.Icon name={"milestone"} /> Milestone
          <span>{milestoneState?.milestones?.length}</span>
        </A.Button>
      </Link>
    </StyledNavigationWrapperLink>
  );
};

export default NavigationWrapperLink;

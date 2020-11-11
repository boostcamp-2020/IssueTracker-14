import React from "react";
import styled from "styled-components";
import A from "./../atoms/index";
import M from "./../molecules/index";
import O from "./../organisms/index";

import {
  useMilestoneState,
  useMilestoneDispatch,
} from "../../stores/milestone";

const StyledMilestoneCountWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MilestoneMenu = ({ status, setStatus }) => {
  const milestoneState = useMilestoneState();
  const openMilestone = milestoneState.milestoneCount.open;
  const closedMilestone = milestoneState.milestoneCount.closed;

  const onClickOpenMilestone = () => {
    setStatus("open");
  };

  const onClickClosedMilestone = () => {
    setStatus("closed");
  };

  return (
    <StyledMilestoneCountWrapper>
      <A.Button
        border={false}
        width={"6rem"}
        onClick={() => onClickOpenMilestone()}
      >
        <StyledContentWrapper>
          <A.Icon
            name={"milestone"}
            color={status === "open" ? "black" : "grey"}
          ></A.Icon>
          <A.Text
            fontSize={"small"}
            color={status === "open" ? "black" : "grey"}
          >
            {" "}
            {openMilestone} Open
          </A.Text>
        </StyledContentWrapper>
      </A.Button>
      <A.Button
        border={false}
        width={"6rem"}
        onClick={() => onClickClosedMilestone()}
      >
        <StyledContentWrapper>
          <A.Icon
            name={"checkDouble"}
            color={status === "closed" ? "black" : "grey"}
          ></A.Icon>
          <A.Text
            fontSize={"small"}
            color={status === "closed" ? "black" : "grey"}
          >
            {" "}
            {closedMilestone} Closed
          </A.Text>
        </StyledContentWrapper>
      </A.Button>
    </StyledMilestoneCountWrapper>
  );
};

export default MilestoneMenu;

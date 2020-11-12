import React from "react";
import styled from "styled-components";
import A from "./../atoms/index";
import M from "./../molecules/index";
import O from "./../organisms/index";

import Store from "../../stores/index";

const StyledMilestoneCountWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 15rem;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MilestoneMenu = ({ status, setStatus }) => {
  const milestoneState = Store.useMilestoneState();
  const openMilestone = milestoneState.milestoneCount?.open;
  const closedMilestone = milestoneState.milestoneCount?.closed;

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
        width={"8rem"}
        onClick={() => onClickOpenMilestone()}
      >
        <StyledContentWrapper>
          <A.Text
            fontSize={"medium"}
            color={status === "open" ? "black" : "grey"}
          >
            <A.Icon
              name={"milestone"}
              color={status === "open" ? "black" : "grey"}
            ></A.Icon>{" "}
            {openMilestone} Open
          </A.Text>
        </StyledContentWrapper>
      </A.Button>
      <A.Button
        border={false}
        width={"8rem"}
        onClick={() => onClickClosedMilestone()}
      >
        <StyledContentWrapper>
          <A.Text
            fontSize={"medium"}
            color={status === "closed" ? "black" : "grey"}
          >
            <A.Icon
              name={"checkDouble"}
              color={status === "closed" ? "black" : "grey"}
            ></A.Icon>{" "}
            {closedMilestone} Closed
          </A.Text>
        </StyledContentWrapper>
      </A.Button>
    </StyledMilestoneCountWrapper>
  );
};

export default MilestoneMenu;

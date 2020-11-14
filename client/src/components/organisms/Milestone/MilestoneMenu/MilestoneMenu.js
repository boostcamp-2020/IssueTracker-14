import React from "react";
import A from "@atoms/index";
import Store from "@stores/index";
import Styled from "./MilestoneMenu.style";

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
    <Styled.MilestoneCountWrapper>
      <A.Button
        border={false}
        width={"8rem"}
        onClick={() => onClickOpenMilestone()}
      >
        <Styled.ContentWrapper>
          <A.Text
            fontSize={"medium"}
            color={status === "open" ? "black" : "darkGrey"}
          >
            <A.Icon
              name={"milestone"}
              color={status === "open" ? "black" : "darkGrey"}
            ></A.Icon>{" "}
            {openMilestone} Open
          </A.Text>
        </Styled.ContentWrapper>
      </A.Button>
      <A.Button
        border={false}
        width={"8rem"}
        onClick={() => onClickClosedMilestone()}
      >
        <Styled.ContentWrapper>
          <A.Text
            fontSize={"medium"}
            color={status === "closed" ? "black" : "darkGrey"}
          >
            <A.Icon
              name={"checkDouble"}
              color={status === "closed" ? "black" : "darkGrey"}
            ></A.Icon>
            {closedMilestone} Closed
          </A.Text>
        </Styled.ContentWrapper>
      </A.Button>
    </Styled.MilestoneCountWrapper>
  );
};

export default MilestoneMenu;

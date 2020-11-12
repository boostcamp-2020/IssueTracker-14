import React from "react";
import styled from "styled-components";
import M from "../molecules/index";
import Store from "../../stores/index";

const StyledMilestoneContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

const MilestoneContent = ({ status }) => {
  const milestoneState = Store.useMilestoneState();
  const milestones = milestoneState.milestones;
  return (
    <StyledMilestoneContent>
      {milestones !== undefined &&
        milestones
          .filter((milestone) => milestone.status === status)
          .map((milestone) => (
            <M.MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
    </StyledMilestoneContent>
  );
};

export default MilestoneContent;

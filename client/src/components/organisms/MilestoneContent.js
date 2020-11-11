import React from "react";
import styled from "styled-components";
import M from "../molecules/index";

const StyledMilestoneContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

const MilestoneContent = ({ milestones, status }) => {
  return (
    <StyledMilestoneContent>
      {milestones
        .filter((milestone) => milestone.status === status)
        .map((milestone) => (
          <M.MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
    </StyledMilestoneContent>
  );
};

export default MilestoneContent;

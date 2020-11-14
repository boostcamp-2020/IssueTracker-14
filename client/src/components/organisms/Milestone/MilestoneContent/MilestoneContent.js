import React, { useEffect } from "react";
import O from "@organisms/index";
import Store from "@stores/index";
import Styled from "./MilestoneContent.style";

const MilestoneContent = ({ status }) => {
  const milestoneState = Store.useMilestoneState();
  const milestones = milestoneState.milestones;
  useEffect(() => {}, [milestones]);
  return (
    <Styled.MilestoneContent>
      {milestones !== undefined &&
        milestones
          .filter((milestone) => milestone.status === status)
          .map((milestone) => (
            <O.MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
    </Styled.MilestoneContent>
  );
};

export default MilestoneContent;

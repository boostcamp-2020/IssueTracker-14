import React from "react";
import styled from "styled-components";

const StyledMilestoneCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #000000;
  width: 100%;
`;

const MilestoneCard = ({ milestone }) => {
  return <StyledMilestoneCard>{milestone.title}</StyledMilestoneCard>;
};

export default MilestoneCard;

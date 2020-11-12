import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import A from "../atoms/index";

const StyledMilestoneCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #000000;
  width: 100%;
`;

const MilestoneCard = ({ milestone }) => {
  return (
    <StyledMilestoneCard>
      <Link
        to={{
          pathname: `/milestones/edit/${milestone.id}`,
          state: { milestone },
        }}
        style={{ textDecoration: "none" }}
      >
        <A.Text fontSize={"2rem"}>{milestone.title}</A.Text>
      </Link>
    </StyledMilestoneCard>
  );
};

export default MilestoneCard;

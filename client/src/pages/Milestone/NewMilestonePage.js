import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import A from "../../components/atoms/index";
import M from "../../components/molecules/index";
import O from "../../components/organisms/index";

const IssuesPageWrapper = styled.div`
  position: relative;
  top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 80%;
  height: auto;
`;

const StyledNewMilestoneHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

const NewMilestonePage = () => {
  return (
    <>
      <O.Header />
      <IssuesPageWrapper>
        <StyledNewMilestoneHeader>
          <M.Title>New Milestone</M.Title>
          <A.Text hover={false} color={"darkGrey"}>
            Create a new milestone to help organize your issues and pull
            requests. Learn more about milestones and issues.
          </A.Text>
          <A.Line color={"gery"} />
        </StyledNewMilestoneHeader>
        <O.NewMilestoneForm />
      </IssuesPageWrapper>
    </>
  );
};

export default NewMilestonePage;

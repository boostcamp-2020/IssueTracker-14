import React from "react";
import A from "@atoms/index";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./NewMilestonePage.style";

const NewMilestonePage = () => {
  return (
    <>
      <O.Header />
      <Styled.IssuesPageWrapper>
        <Styled.NewMilestoneHeader>
          <M.Title>New Milestone</M.Title>
          <A.Text hover={false} color={"darkGrey"}>
            Create a new milestone to help organize your issues and pull
            requests. Learn more about milestones and issues.
          </A.Text>
          <A.Line color={"grey"} />
        </Styled.NewMilestoneHeader>
        <O.NewMilestoneForm />
      </Styled.IssuesPageWrapper>
    </>
  );
};

export default NewMilestonePage;

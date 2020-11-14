import React from "react";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./EditMilestonePage.style";

const EditMilestonePage = ({ location }) => {
  return (
    <>
      <O.Header />
      <Styled.IssuesPageWrapper>
        <Styled.EditMilestoneHeader>
          <M.NavigationWrapperLink location={"milestone"} />
        </Styled.EditMilestoneHeader>
        <O.EditMilestoneForm milestone={location.state.milestone} />
      </Styled.IssuesPageWrapper>
    </>
  );
};

export default EditMilestonePage;

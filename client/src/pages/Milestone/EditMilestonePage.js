import React from "react";
import styled from "styled-components";
import M from "../../components/molecules/index";
import O from "../../components/organisms/index";

const IssuesPageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 70%;
  height: auto;
`;

const StyledEditMilestoneHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

const EditMilestonePage = ({ location }) => {
  return (
    <>
      <O.Header />
      <IssuesPageWrapper>
        <StyledEditMilestoneHeader>
          <M.NavigationWrapperLink location={"milestone"} />
        </StyledEditMilestoneHeader>
        <O.EditMilestoneForm milestone={location.state.milestone} />
      </IssuesPageWrapper>
    </>
  );
};

export default EditMilestonePage;

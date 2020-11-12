import React from "react";
import styled from "styled-components";
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

const StyledEditMilestoneHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

const EditMilestonePage = () => {
  return (
    <>
      <O.Header />
      <IssuesPageWrapper>
        <StyledEditMilestoneHeader>
          <M.NavigationWrapperLink location={"milestone"} />
        </StyledEditMilestoneHeader>
        <O.NewMilestoneForm />
      </IssuesPageWrapper>
    </>
  );
};

export default EditMilestonePage;

import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import colors from "../../constants/colors";
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
  align-items: space-between;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

const MilestonePage = () => {
  const history = useHistory();

  const onClickNewMilestone = () => {
    history.push("/milestones/new");
  };

  return (
    <>
      <O.Header />
      <IssuesPageWrapper>
        <StyledNewMilestoneHeader>
          <M.NavigationWrapperLink location={"milestone"} />
          <M.ButtonDiv
            buttonColor={colors.green}
            width={"8rem"}
            height={"2rem"}
            onClick={onClickNewMilestone}
            textColor={colors.white}
            fontSize={"small"}
            hover={false}
            border={true}
          >
            New Milestone
          </M.ButtonDiv>
        </StyledNewMilestoneHeader>
      </IssuesPageWrapper>
    </>
  );
};

export default MilestonePage;

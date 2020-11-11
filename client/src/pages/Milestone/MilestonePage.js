import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  useMilestoneState,
  useMilestoneDispatch,
} from "../../stores/milestone";
import fetchData from "../../utils/fetchData";
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
  width: 100%;
  margin: 20px 0;
`;

const MilestonePage = () => {
  const [status, setStatus] = useState("open");
  const history = useHistory();

  const milestoneState = useMilestoneState();
  const milestoneDispatch = useMilestoneDispatch();

  const onClickNewMilestone = () => {
    history.push("/milestones/new");
  };

  useEffect(() => {
    fetchData("milestone", milestoneDispatch);
  }, [status]);

  return (
    <>
      <O.Header />
      <IssuesPageWrapper>
        <StyledNewMilestoneHeader>
          <div>
            <M.NavigationWrapperLink location={"milestone"} />
          </div>
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
        <M.Container
          menu={<O.MilestoneMenu status={status} setStatus={setStatus} />}
          content={
            <O.MilestoneContent
              milestones={milestoneState.milestones}
              status={status}
            />
          }
        />
      </IssuesPageWrapper>
    </>
  );
};

export default MilestonePage;

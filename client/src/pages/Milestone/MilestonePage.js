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

const StyledNavigationWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

const MilestonePage = () => {
  const [status, setStatus] = useState("open");
  const history = useHistory();

  const milestoneDispatch = useMilestoneDispatch();

  const onClickNewMilestone = () => {
    history.push("/milestones/new");
  };

  useEffect(() => {
    fetchData("milestone", milestoneDispatch);
  }, []);

  return (
    <>
      <O.Header />
      <IssuesPageWrapper>
        <StyledNewMilestoneHeader>
          <StyledNavigationWrapper>
            <M.NavigationWrapperLink location={"milestone"} />
            <M.ButtonDiv
              buttonColor={"green"}
              width={"8rem"}
              height={"2rem"}
              textColor={"white"}
              fontSize={"small"}
              hover={false}
              border={true}
              onClick={onClickNewMilestone}
            >
              New Milestone
            </M.ButtonDiv>
          </StyledNavigationWrapper>
        </StyledNewMilestoneHeader>
        <M.Container
          menu={<O.MilestoneMenu status={status} setStatus={setStatus} />}
          content={<O.MilestoneContent status={status} />}
        />
      </IssuesPageWrapper>
    </>
  );
};

export default MilestonePage;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Store from "../../stores/index";
import fetchData from "../../utils/fetchData";
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
  min-width: 50rem;
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

  const milestoneDispatch = Store.useMilestoneDispatch();

  useEffect(() => {
    return fetchData("milestone", milestoneDispatch);
  }, []);

  return (
    <>
      <O.Header />
      <IssuesPageWrapper>
        <StyledNewMilestoneHeader>
          <StyledNavigationWrapper>
            <M.NavigationWrapperLink location={"milestone"} />
            <Link to={"/milestones/new"} style={{ textDecoration: "none" }}>
              <M.ButtonDiv
                buttonColor={"green"}
                width={"8rem"}
                height={"2rem"}
                textColor={"white"}
                fontSize={"small"}
                hover={false}
                border={true}
              >
                New Milestone
              </M.ButtonDiv>
            </Link>
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

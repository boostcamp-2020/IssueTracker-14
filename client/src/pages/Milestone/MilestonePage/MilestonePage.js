import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Store from "@stores/index";
import fetchData from "@utils/fetchData";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./MilestonePage.style";

const MilestonePage = () => {
  const [status, setStatus] = useState("open");

  const milestoneDispatch = Store.useMilestoneDispatch();

  useEffect(() => {
    return fetchData("milestone", milestoneDispatch);
  }, []);

  return (
    <>
      <O.Header />
      <Styled.IssuesPageWrapper>
        <Styled.NewMilestoneHeader>
          <Styled.NavigationWrapper>
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
          </Styled.NavigationWrapper>
        </Styled.NewMilestoneHeader>
        <M.Container
          menu={<O.MilestoneMenu status={status} setStatus={setStatus} />}
          content={<O.MilestoneContent status={status} />}
        />
      </Styled.IssuesPageWrapper>
    </>
  );
};

export default MilestonePage;

import React, { useCallback } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import A from "../atoms/index";
import Store from "../../stores/index";
import fetchData from "../../utils/fetchData";

const StyledMilestoneCard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #d1d5da;
  width: 100%;
  height: 8rem;
`;

const StyledMilestoneCardLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 2rem;
  width: 20rem;
`;

const StyledMilestoneCardRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 10px;
  width: 28rem;
  height: 70%;
`;
const StyledProgressBarWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 25rem;
  background-color: #e3e3e4;
  border-radius: 4px;
  height: 0.5rem;
`;
const StyledProgressBar = styled.div`
  background-color: #2ea44f;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: ${({ rate }) => rate}%;
  height: 100%;
`;
const StyledMilestoneIssueWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const StyledMilestoneCardNavigation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MilestoneCard = ({ milestone }) => {
  const changeDate = new Date(milestone.duedate?.split("T")[0]).toDateString();
  const milestoneDispatch = Store.useMilestoneDispatch();
  const history = useHistory();
  const issueCount = { open: 0, closed: 0 };

  milestone.issues.forEach((issue) => {
    switch (issue.status) {
      case "open":
        issueCount.open++;
        break;
      case "closed":
        issueCount.closed++;
        break;
    }
  });

  const rate = (() => {
    if (issueCount.open + issueCount.closed === 0) {
      return 0;
    }
    return (issueCount.closed / (issueCount.open + issueCount.closed)) * 100;
  })();

  const onClickDeleteMilestone = useCallback(async () => {
    if (confirm(`정말로 ${milestone.title} milestone을 삭제하시겠습니까?`)) {
      await milestoneDispatch({
        type: "DELETE_MILESTONE",
        data: milestone.id,
      });
      await fetchData("milestone", milestoneDispatch);
      history.push("/milestones");
    }
  }, []);

  const onClickClosedMilestone = useCallback(async () => {
    if (confirm(`정말로 ${milestone.title} milestone을 Closed하시겠습니까?`)) {
      await milestoneDispatch({ type: "CLOSED_MILESTONE", data: milestone.id });
      await fetchData("milestone", milestoneDispatch);
      history.push("/milestones");
    }
  }, []);

  return (
    <StyledMilestoneCard>
      <StyledMilestoneCardLeft>
        <Link
          to={{
            pathname: `/milestones/edit/${milestone.id}`,
            state: { milestone },
          }}
          style={{ textDecoration: "none" }}
        >
          <A.Text fontSize={"2rem"}>{milestone.title}</A.Text>
        </Link>
        <A.Text fontSize={"1rem"} color={"darkGrey"}>
          <A.Icon name={"calendar"} />
          {milestone.duedate ? `Due by  ${changeDate}` : "No Due Date"}
        </A.Text>
        <A.Text fontSize={"1rem"} color={"darkGrey"}>
          {milestone.description ? milestone.description : "No Description"}
        </A.Text>
      </StyledMilestoneCardLeft>

      <StyledMilestoneCardRight>
        <StyledProgressBarWrapper>
          <StyledProgressBar rate={rate} />
        </StyledProgressBarWrapper>
        <StyledMilestoneIssueWrapper>
          <A.Text>{rate}%</A.Text>
          <A.Text fontSize={"1rem"} color={"darkGrey"} margin={"0"}>
            complete
          </A.Text>
          <A.Text fontSize={"1rem"}>{issueCount.open}</A.Text>
          <A.Text fontSize={"1rem"} color={"darkGrey"} margin={"0"}>
            Open
          </A.Text>
          <A.Text fontSize={"1rem"}>{issueCount.closed}</A.Text>
          <A.Text fontSize={"1rem"} color={"darkGrey"} margin={"0"}>
            Closed
          </A.Text>
        </StyledMilestoneIssueWrapper>
        <StyledMilestoneCardNavigation>
          <Link
            to={{
              pathname: `/milestones/edit/${milestone.id}`,
              state: { milestone },
            }}
            style={{ textDecoration: "none" }}
          >
            <A.Text color={"blue"}>Edit</A.Text>
          </Link>
          <A.Text color={"blue"} onClick={onClickClosedMilestone}>
            Close
          </A.Text>
          <A.Text color={"red"} onClick={onClickDeleteMilestone}>
            Delete
          </A.Text>
        </StyledMilestoneCardNavigation>
      </StyledMilestoneCardRight>
    </StyledMilestoneCard>
  );
};

export default MilestoneCard;

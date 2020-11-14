import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import A from "@atoms/index";
import Store from "@stores/index";
import fetchData from "@utils/fetchData";
import Styled from "./MilestoneCard.style";

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
    <Styled.MilestoneCard>
      <Styled.MilestoneCardLeft>
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
      </Styled.MilestoneCardLeft>

      <Styled.MilestoneCardRight>
        <Styled.ProgressBarWrapper>
          <Styled.ProgressBar rate={rate} />
        </Styled.ProgressBarWrapper>
        <Styled.MilestoneIssueWrapper>
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
        </Styled.MilestoneIssueWrapper>
        <Styled.MilestoneCardNavigation>
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
        </Styled.MilestoneCardNavigation>
      </Styled.MilestoneCardRight>
    </Styled.MilestoneCard>
  );
};

export default MilestoneCard;

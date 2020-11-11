import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import colors from "../../constants/colors";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import A from "../../components/atoms/index";
import M from "../../components/molecules/index";
import O from "../../components/organisms/index";
import { useIssueState, useIssueDispatch } from "../../stores/issue";
import { useLabelDispatch } from "../../stores/label";
import { useMilestoneDispatch } from "../../stores/milestone";
import { useQueryState } from "../../stores/query";
import fetchTargetData from "../../utils/fetchData";

const IssuesPageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 80%;
`;

const StyledNavigationWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0rem 0.5rem 0rem;
`;

const StyledIssueContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0rem 1.5rem 0rem;
  width: 100%;
`;

const queryToString = (query) => {
  const queryAuthor = query.author ? `&author=${query.author}` : "";
  const queryLabel = (() => {
    if (query.label.length !== 0) {
      return query.label.reduce((acc, label) => {
        return acc + `&label=${label}`;
      }, "");
    }
    return "";
  })();
  const queryAssignee = query.assignee ? `&assignee=${query.assignee}` : "";
  const queryMilestone = query.milestone ? `&milestone=${query.milestone}` : "";
  return `?status=${query.status}${queryAuthor}${queryLabel}${queryAssignee}${queryMilestone}`;
};

const IssuesPage = () => {
  const history = useHistory();

  const issueState = useIssueState();
  const queryState = useQueryState();

  const issueDispatch = useIssueDispatch();
  const labelDispatch = useLabelDispatch();
  const milestoneDispatch = useMilestoneDispatch();

  const [selected, setSelected] = useState([]);
  const [totalSelected, setTotalSelected] = useState(false);

  useEffect(() => {
    fetchTargetData(`issues${queryToString(queryState.query)}`, issueDispatch);
    fetchTargetData("label", labelDispatch);
    fetchTargetData("milestone", milestoneDispatch);
  }, [queryState.query]);

  const onClickNewIssue = () => {
    history.push("/issues/new");
  };

  return (
    <>
      <Header />
      <IssuesPageWrapper>
        <StyledNavigationWrapper>
          <O.NavigationWrapperInput />
          <M.NavigationWrapperLink />
          <M.ButtonDiv
            buttonColor={"green"}
            width={"8rem"}
            height={"2rem"}
            onClick={onClickNewIssue}
            textColor={"white"}
            fontSize={"small"}
            hover={false}
            border={true}
          >
            New Issue
          </M.ButtonDiv>
        </StyledNavigationWrapper>
        <StyledIssueContentWrapper>
          <M.ClearIssueFilter />
          <M.Container
            menu={
              <O.IssueMenu
                selected={selected}
                setSelected={setSelected}
                totalSelected={totalSelected}
                setTotalSelected={setTotalSelected}
              />
            }
            content={
              <O.IssueContent
                issues={issueState.issues}
                selected={selected}
                setSelected={setSelected}
                totalSelected={totalSelected}
                setTotalSelected={setTotalSelected}
              />
            }
          />
        </StyledIssueContentWrapper>
      </IssuesPageWrapper>
    </>
  );
};

export default IssuesPage;

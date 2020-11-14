import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import M from "@molecules/index";
import O from "@organisms/index";
import Store from "@stores/index";
import fetchTargetData from "@utils/fetchData";
import Styled from "./IssuesPage.style.js";

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
  const issueState = Store.useIssueState();
  const queryState = Store.useQueryState();

  const issueDispatch = Store.useIssueDispatch();
  const labelDispatch = Store.useLabelDispatch();
  const milestoneDispatch = Store.useMilestoneDispatch();

  const [selected, setSelected] = useState([]);
  const [totalSelected, setTotalSelected] = useState(false);

  useEffect(() => {
    fetchTargetData(`issues${queryToString(queryState.query)}`, issueDispatch);
    fetchTargetData("label", labelDispatch);
    fetchTargetData("milestone", milestoneDispatch);

    if (issueState.issues.length === selected.length) setTotalSelected(true);
    else if (totalSelected === true) setTotalSelected(false);
    if (selected.length === 0) setTotalSelected(false);
  }, [queryState.query]);

  return (
    <>
      <O.Header />
      <Styled.IssuesPageWrapper>
        <Styled.NavigationWrapper>
          <O.IssueFilterAndSearch />
          <M.NavigationWrapperLink />
          <Link to={"/issues/new"} style={{ textDecoration: "none" }}>
            <M.ButtonDiv
              buttonColor={"green"}
              width={"8rem"}
              height={"2rem"}
              textColor={"white"}
              fontSize={"small"}
              hover={false}
              border={true}
            >
              New Issue
            </M.ButtonDiv>
          </Link>
        </Styled.NavigationWrapper>
        <Styled.IssueContentWrapper>
          {queryState.isChanged && <M.ClearIssueFilter />}
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
        </Styled.IssueContentWrapper>
      </Styled.IssuesPageWrapper>
    </>
  );
};

export default IssuesPage;

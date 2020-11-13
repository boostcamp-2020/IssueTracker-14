import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import O from "../../components/organisms/index";
import A from "../../components/atoms/index";
import fetchTargetData from "../../utils/fetchData";
import { useCommentState, useCommentDispatch } from "../../stores/comment";
import { useIssueDispatch } from "../../stores/issue";

const StyledEditIssuePageWrapper = styled.div`
  position: relative;
  top: 6rem;
  margin: 0 auto;
  padding: 3rem;
  width: 80vw;
  min-width: 50rem;
`;

const StyledEditIssueMain = styled.div`
  display: flex;
`;

const StyledCommentsWrapper = styled.div``;
const StyledCommentFormWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const EditIssuePage = ({ match, location }) => {
  const commentState = useCommentState();
  const commentDispatch = useCommentDispatch();

  const issueDispatch = useIssueDispatch();

  const { issueId } = match.params;
  const { issue } = location.state;
  const { assignees, label_has_issues, milestone } = issue;

  const [issueStatus, setIssueStatus] = useState(issue.status);

  useEffect(() => {
    fetchTargetData(`issues/${issueId}/comment`, commentDispatch);

    if (assignees.length !== 0) {
      assignees.forEach((assignee) => {
        issueDispatch({ type: "ADD_ASSIGNEE", data: assignee.user.id });
      });
    }

    if (label_has_issues.length !== 0) {
      label_has_issues.forEach((el) => {
        if (el.label === null) return;
        issueDispatch({ type: "ADD_LABEL", data: el.label.id });
      });
    }

    if (milestone !== null) {
      issueDispatch({ type: "ADD_MILESTONE", data: milestone.id });
    }
  }, []);

  return (
    <>
      <Header />
      <StyledEditIssuePageWrapper>
        <O.EditIssueHeader issue={issue} issueStatus={issueStatus} />
        <StyledEditIssueMain>
          <StyledCommentsWrapper>
            {commentState.comments.length === 0 ? (
              <StyledCommentFormWrapper>
                <A.Image imageUrl={issue.user.imageurl} padding={"0 0.5rem"} />
                <O.EditIssueForm />
              </StyledCommentFormWrapper>
            ) : (
              commentState.comments.map((comment) => {
                return (
                  <StyledCommentFormWrapper key={comment.id}>
                    <A.Image
                      imageUrl={comment.user.imageurl}
                      padding={"0 0.5rem"}
                    />
                    <O.EditIssueForm issueId={issue.id} comment={comment} />
                  </StyledCommentFormWrapper>
                );
              })
            )}
            <O.NewCommentForm
              issueId={issue.id}
              issueStatus={issueStatus}
              setIssueStatus={setIssueStatus}
            />
          </StyledCommentsWrapper>
          <O.NewIssueOptions />
        </StyledEditIssueMain>
      </StyledEditIssuePageWrapper>
    </>
  );
};

export default EditIssuePage;

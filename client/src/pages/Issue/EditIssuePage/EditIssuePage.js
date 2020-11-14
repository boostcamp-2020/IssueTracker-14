import React, { useState, useEffect } from "react";
import A from "@atoms/index";
import O from "@organisms/index";
import Store from "@stores/index";
import fetchTargetData from "@utils/fetchData";
import Styled from "./EditIssuePage.style";

const EditIssuePage = ({ match, location }) => {
  const commentState = Store.useCommentState();
  const commentDispatch = Store.useCommentDispatch();

  const issueDispatch = Store.useIssueDispatch();

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
      <O.Header />
      <Styled.EditIssuePageWrapper>
        <O.EditIssueHeader issue={issue} issueStatus={issueStatus} />
        <Styled.EditIssueMain>
          <Styled.CommentsWrapper>
            {commentState.comments.length === 0 ? (
              <Styled.CommentFormWrapper>
                <A.Image imageUrl={issue.user.imageurl} padding={"0 0.5rem"} />
                <O.EditIssueForm issueId={issue.id} />
              </Styled.CommentFormWrapper>
            ) : (
              commentState.comments.map((comment) => {
                return (
                  <Styled.CommentFormWrapper key={comment.id}>
                    <A.Image
                      imageUrl={comment.user.imageurl}
                      padding={"0 0.5rem"}
                    />
                    <O.EditIssueForm issueId={issue.id} comment={comment} />
                  </Styled.CommentFormWrapper>
                );
              })
            )}
            <O.NewCommentForm
              issueId={issue.id}
              issueStatus={issueStatus}
              setIssueStatus={setIssueStatus}
            />
          </Styled.CommentsWrapper>
          <O.NewIssueOptions />
        </Styled.EditIssueMain>
      </Styled.EditIssuePageWrapper>
    </>
  );
};

export default EditIssuePage;

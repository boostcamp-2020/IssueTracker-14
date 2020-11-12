import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import O from "../../components/organisms/index";
import A from "../../components/atoms/index";
import fetchTargetData from "../../utils/fetchData";
import { useCommentState, useCommentDispatch } from "../../stores/comment";

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

const EditIssuePage = ({ match, location }) => {
  const commentState = useCommentState();
  const commentDispatch = useCommentDispatch();

  const { issueId } = match.params;
  const { issue } = location.state;

  useEffect(
    () => fetchTargetData(`issues/${issueId}/comment`, commentDispatch),
    []
  );

  return (
    <>
      <Header />
      <StyledEditIssuePageWrapper>
        <O.EditIssueHeader issue={issue} />
        <StyledEditIssueMain>
          <A.Image imageUrl={issue.user.imageUrl} padding={"0 0.5rem"} />
          <O.EditIssueForm user={issue.user} comments={commentState.comments} />
          <O.EditIssueOptions issue={issue} />
        </StyledEditIssueMain>
      </StyledEditIssuePageWrapper>
    </>
  );
};

export default EditIssuePage;

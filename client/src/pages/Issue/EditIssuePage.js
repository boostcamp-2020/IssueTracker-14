import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import O from "../../components/organisms/index";
import A from "../../components/atoms/index";
import myAxios from "../../utils/myAxios";
import { useIssueState, useIssueDispatch } from "../../stores/issue";

const StyledEditIssuePageWrapper = styled.div`
  position: relative;
  top: 6rem;
  margin: 0 auto;
  padding: 3rem;
  width: 60vw;
`;

const StyledEditIssueMain = styled.div`
  display: flex;
`;

const EditIssuePage = ({ match, location }) => {
  const { issueId } = match.params;
  const { issue } = location.state;
  console.log(issue);

  useEffect(() => {
    // myAxios
    //   .get(`/issues/${issueId}`)
    //   .then((response) => setIssue(response.data.issue))
    //   .catch((err) => alert(err));
  }, []);

  return (
    <>
      <Header />
      <StyledEditIssuePageWrapper>
        <O.EditIssueHeader issue={issue} />
        <StyledEditIssueMain>
          <A.Image imageUrl={issue.user.imageUrl} padding={"0 0.5rem"} />
          <O.EditIssueForm issue={issue} />
        </StyledEditIssueMain>
      </StyledEditIssuePageWrapper>
    </>
  );
};

export default EditIssuePage;

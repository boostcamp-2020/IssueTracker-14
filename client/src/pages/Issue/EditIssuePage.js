import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import O from "../../components/organisms/index";
import myAxios from "../../utils/myAxios";

const EditIssuePageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const EditIssuePage = ({ match }) => {
  const { issueId } = match.params;

  const [issue, setIssue] = useState(undefined);

  useEffect(() => {
    myAxios
      .get(`/issues/${issueId}`)
      .then((response) => setIssue(response.data.issue))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      <Header />
      <EditIssuePageWrapper>
        <O.EditIssueForm issue={issue} />
      </EditIssuePageWrapper>
    </>
  );
};

export default EditIssuePage;

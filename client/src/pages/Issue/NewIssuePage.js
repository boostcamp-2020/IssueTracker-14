import React from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";

const NewIssuePageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  justify-content: center;
`;

const NewIssuePage = () => {
  return (
    <>
      <Header />
      <NewIssuePageWrapper>
        <div>New Issue</div>
      </NewIssuePageWrapper>
    </>
  );
};

export default NewIssuePage;

import React from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import NavigationWrapper from "../../components/organisms/NavigationWrapper";
import IssueWrapper from "../../components/organisms/IssueWrapper";

const IssuesPageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 80%;
`;

const IssuesPage = () => (
  <>
    <Header />
    <IssuesPageWrapper>
      <NavigationWrapper />
      <IssueWrapper />
    </IssuesPageWrapper>
  </>
);

export default IssuesPage;

import React from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import NavigationWrapperInput from "./../../components/organisms/NavigationWrapperInput";
import NavigationWrapperLink from "./../../components/molecules/NavigationWrapperLink";
import NewIssueButton from "./../../components/molecules/NewIssueButton";
import IssueWrapper from "./../../components/organisms/IssueWrapper";

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

const IssuesPage = () => (
  <>
    <Header />
    <IssuesPageWrapper>
      <StyledNavigationWrapper>
          <NavigationWrapperInput />
          <NavigationWrapperLink />
          <NewIssueButton />
      </StyledNavigationWrapper>
      <IssueWrapper />
    </IssuesPageWrapper>
  </>
);

export default IssuesPage;

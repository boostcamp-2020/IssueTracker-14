import React from "react";
import { useHistory } from "react-router-dom";
import colors from "../../constants/colors";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import NavigationWrapperInput from "./../../components/organisms/NavigationWrapperInput";
import NavigationWrapperLink from "./../../components/molecules/NavigationWrapperLink";
import A from "../../components/atoms/index";
import M from "../../components/molecules/index";
import O from "../../components/organisms/index";

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

const IssuesPage = () => {
  const history = useHistory();

  const onClickNewIssue = () => {
    history.push("/issues/new");
  };

  return (
    <>
      <Header />
      <IssuesPageWrapper>
        <StyledNavigationWrapper>
          <NavigationWrapperInput />
          <NavigationWrapperLink />
          <M.ButtonDiv
            buttonColor={colors.green}
            width={"8rem"}
            height={"2rem"}
            onClick={onClickNewIssue}
            textColor={colors.white}
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
            menu={<O.IssueMenu />}
            content={<O.IssueContent />}
          />
        </StyledIssueContentWrapper>
      </IssuesPageWrapper>
    </>
  );
};

export default IssuesPage;

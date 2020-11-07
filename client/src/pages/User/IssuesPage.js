import React from "react";
import styled from "styled-components";
import Header from "./../../components/organisms/Header";

const IssuesPageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const IssuesPage = () => (
  <>
    <Header />
    <IssuesPageWrapper>
      <div>
        Issue바디 페이지
      </div>
    </IssuesPageWrapper>
  </>
);

export default IssuesPage;

import React from "react";
import styled from "styled-components";

const IssuesPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 930px;
`;

const IssuesPage = () => (
  <IssuesPageWrapper>
    Issue가 들어올 자리
  </IssuesPageWrapper>
);

export default IssuesPage;

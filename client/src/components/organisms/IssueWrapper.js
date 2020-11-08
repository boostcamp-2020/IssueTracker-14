import React from "react";
import styled from "styled-components";
import Checkbox from "../atoms/Checkbox";
import ClearIssueFilter from "../molecules/ClearIssueFilter";
import IssueMenuDropdowns from "../organisms/IssueMenuDropdowns";

const StyledIssueWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0rem 1.5rem 0rem;
  width: 100%;
`;

const StyledIssueMenuWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #000000;
  padding: 0rem 1rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const IssueWrapper = () => (
    <StyledIssueWrapper>
        <ClearIssueFilter />
        <StyledIssueMenuWrapper>
          <Checkbox />
          <IssueMenuDropdowns />
        </StyledIssueMenuWrapper>
    </StyledIssueWrapper>
);

export default IssueWrapper;

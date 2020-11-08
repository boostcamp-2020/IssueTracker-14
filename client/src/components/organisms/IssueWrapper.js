import React from "react";
import styled from "styled-components";
import Checkbox from "../atoms/Checkbox";
import ClearIssueFilter from "../molecules/ClearIssueFilter";

const StyledIssueWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0rem 1.5rem 0rem;
  width: 80%;
`;

const IssueWrapper = () => (
    <StyledIssueWrapper>
        <ClearIssueFilter />
    </StyledIssueWrapper>
);

export default IssueWrapper;

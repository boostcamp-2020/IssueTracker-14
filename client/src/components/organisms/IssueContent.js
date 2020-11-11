import React from "react";
import styled from "styled-components";
import A from "./../atoms/index";
import M from "./../molecules/index";
import O from "./../organisms/index";

const StyledIssueContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

const IssueContent = ({ issues }) => {
  return (
    <StyledIssueContent>
      {issues.map((issue) => (
        <M.IssueData key={issue.id} props={issue} />
      ))}
    </StyledIssueContent>
  );
};

export default IssueContent;

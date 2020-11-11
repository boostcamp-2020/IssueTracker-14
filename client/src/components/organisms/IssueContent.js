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

const IssueContent = ({ issues, selected, setSelected }) => {
  return (
    <StyledIssueContent>
      {issues.map((issue) => (
        <M.IssueData
          key={issue.id}
          props={issue}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </StyledIssueContent>
  );
};

export default IssueContent;

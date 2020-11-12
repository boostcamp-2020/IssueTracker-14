import React, { useEffect } from "react";
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

const IssueContent = ({
  issues,
  selected,
  setSelected,
  totalSelected,
  setTotalSelected,
}) => {
  return (
    <StyledIssueContent>
      {issues.map((issue) => (
        <M.IssueCard
          key={issue.id}
          issue={issue}
          selected={selected}
          setSelected={setSelected}
          totalSelected={totalSelected}
          setTotalSelected={setTotalSelected}
        />
      ))}
    </StyledIssueContent>
  );
};

export default IssueContent;

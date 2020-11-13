import React from "react";
import styled from "styled-components";
import M from "../../molecules/index";

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
      {issues.length !== 0 ? (
        issues.map((issue) => (
          <M.IssueCard
            key={issue.id}
            issue={issue}
            selected={selected}
            setSelected={setSelected}
            totalSelected={totalSelected}
            setTotalSelected={setTotalSelected}
          />
        ))
      ) : (
        <M.ContentEmpty />
      )}
    </StyledIssueContent>
  );
};

export default IssueContent;

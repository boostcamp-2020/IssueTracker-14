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

const StyledIssueContentEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 20rem;
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
        <StyledIssueContentEmpty>
          <A.Text fontSize={"2rem"} color={"darkGrey"}>
            <A.Icon name={"alert"} color={"darkGrey"}></A.Icon>
          </A.Text>
          <A.Text></A.Text>
          <A.Text fontSize={"2rem"}>No results matched your search.</A.Text>
        </StyledIssueContentEmpty>
      )}
    </StyledIssueContent>
  );
};

export default IssueContent;

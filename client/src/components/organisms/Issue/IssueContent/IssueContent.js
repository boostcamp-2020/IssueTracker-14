import React from "react";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./IssueContent.style";

const IssueContent = ({
  issues,
  selected,
  setSelected,
  totalSelected,
  setTotalSelected,
}) => {
  return (
    <Styled.IssueContent>
      {issues.length !== 0 ? (
        issues.map((issue) => (
          <O.IssueCard
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
    </Styled.IssueContent>
  );
};

export default IssueContent;

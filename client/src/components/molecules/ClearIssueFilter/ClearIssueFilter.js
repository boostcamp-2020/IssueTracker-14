import React from "react";
import A from "@atoms/index";
import Styled from "./ClearIssueFilter.style";

const ClearIssueFilter = ({ onClick }) => {
  return (
    <Styled.ClearIssueFilter
      onClick={() => {
        location.href = "/";
      }}
    >
      <A.Text color={"darkGrey"} fontSize={"1.2rem"} hover={false}>
        <A.Icon location={"left"} name={"reset"} />
        Clear current search query, filters, and sorts
      </A.Text>
    </Styled.ClearIssueFilter>
  );
};

export default ClearIssueFilter;

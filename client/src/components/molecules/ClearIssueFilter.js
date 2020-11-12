import React from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledClearIssueFilter = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0px 0px 0px 12px;
`;

const ClearIssueFilter = ({ onClick }) => {
  return (
    <StyledClearIssueFilter
      onClick={() => {
        location.href = "/";
      }}
    >
      <A.Text color={"black"} fontSize={"1.2rem"} hover={false}>
        <A.Icon location={"left"} name={"reset"} />
        Clear current search query, filters, and sorts
      </A.Text>
    </StyledClearIssueFilter>
  );
};

export default ClearIssueFilter;

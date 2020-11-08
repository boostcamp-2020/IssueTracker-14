import React from "react";
import styled from "styled-components";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";

const StyledClearIssueFilter = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0px 0px 0px 12px;
`;

const ClearIssueFilter = ({ onClick }) => (
  <StyledClearIssueFilter onClick={onClick}>
      <Text color={"black"} fontSize={"1.2rem"} hover={false}>
        <Icon location={"left"} name={"reset"} />
        Clear current search query, filters, and sorts
      </Text>
  </StyledClearIssueFilter>
);

export default ClearIssueFilter;

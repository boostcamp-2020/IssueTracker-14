import React from "react";
import { useLabelDispatch } from "../../stores/label";
import styled from "styled-components";
import A from "./../atoms/index";

const StyledLabelMenuWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  padding: 0rem 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const LabelMenu = ({ labels }) => {
  return (
    <StyledLabelMenuWrapper>
      <A.Text>{labels.length<=1 ? `${labels.length} label` : `${labels.length} labels`}</A.Text>
    </StyledLabelMenuWrapper>
  );
};

export default LabelMenu;

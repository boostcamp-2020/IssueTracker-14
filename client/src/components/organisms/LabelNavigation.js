import React from "react";
import styled from "styled-components";
import M from "../molecules/index";
import O from "../organisms/index";

const StyledLabelNavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const StyledLabelButtons = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const LabelNavigation = () => {
  return (
  <StyledLabelNavigationWrapper>
    <StyledLabelButtons>
      <M.NavigationWrapperLink location={"label"}/>
      <M.ButtonDiv
              buttonColor={"green"}
              width={"8rem"}
              height={"2rem"}
              textColor={"white"}
              fontSize={"small"}
              hover={false}
              border={true}
        >New Label</M.ButtonDiv>
    </StyledLabelButtons>
    <M.LabelModal editMode={false} />
  </StyledLabelNavigationWrapper>
)};

export default LabelNavigation;

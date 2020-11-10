import React from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";

const StyledLabelNavigation = styled.div`
  position: relative;
  jusitfy-content: space-between;
  display: flex;
  width: 100%;
`;

const LabelNavigation = () => (
  <StyledLabelNavigation>
    <M.NavigationWrapperLink />
    <M.ButtonDiv
            buttonColor={"green"}
            width={"8rem"}
            height={"2rem"}
            textColor={"white"}
            fontSize={"small"}
            hover={false}
            border={true}
      >New Label</M.ButtonDiv>
  </StyledLabelNavigation>
);

export default LabelNavigation;

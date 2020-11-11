import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import { Link } from "react-router-dom";
import A from "../atoms/index";

import { useLabelState } from "../../stores/label";
import { useMilestoneState } from "../../stores/milestone";

const StyledNavigationWrapperLink = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledCountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: "#e3e3e4";
  border: 1px solid "#e3e3e4";
  border-radius: 6px;
  width: 1rem;
  height: 1rem;
  margin-left: 4px;
  color: "white";
`;

// TODO: span tag div로 바꾸기
const NavigationWrapperLink = ({ location }) => {
  const labelState = useLabelState();
  const milestoneState = useMilestoneState();
  return (
    <StyledNavigationWrapperLink>
      <Link to={""} style={{ textDecoration: "none" }}>
        <A.Button
          border={true}
          rounded={false}
          width={"8rem"}
          height={"2rem"}
          buttonColor={location === "label" ? colors.blue : colors.white}
        >
          <StyledContentWrapper>
            <A.Icon
              name={"label"}
              color={location !== "label" ? "black" : "white"}
            />
            <A.Text
              fontSize={"small"}
              color={location !== "label" ? "black" : "white"}
            >
              Label
            </A.Text>
            {!location && (
              <StyledCountDiv> {labelState?.labels?.length}</StyledCountDiv>
            )}
          </StyledContentWrapper>
        </A.Button>
      </Link>
      <Link to={"/milestones"} style={{ textDecoration: "none" }}>
        <A.Button
          border={true}
          rounded={false}
          width={"8rem"}
          height={"2rem"}
          backgroundColor={
            location === "milestone" ? colors.blue : colors.white
          }
        >
          <StyledContentWrapper>
            <A.Icon
              name={"milestone"}
              color={location !== "milestone" ? "black" : "white"}
            />
            <A.Text
              fontSize={"small"}
              color={location !== "milestone" ? "black" : "white"}
            >
              Milestone
            </A.Text>
            {!location && (
              <StyledCountDiv>
                {milestoneState?.milestones?.length}
              </StyledCountDiv>
            )}
          </StyledContentWrapper>
        </A.Button>
      </Link>
    </StyledNavigationWrapperLink>
  );
};

export default NavigationWrapperLink;

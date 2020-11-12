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
  margin: 0px 4px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledCountDiv = styled.span`
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
const NavigationWrapperLink = ({ location }) => {
  const labelState = useLabelState();
  const milestoneState = useMilestoneState();
  return (
    <StyledNavigationWrapperLink>
      <Link to={"/labels"} style={{ textDecoration: "none" }}>
        <A.Button
          border={true}
          rounded={false}
          width={"8rem"}
          height={"2rem"}
          rounded
          borderColor={"#d1d5da"}
          backgroundColor={location === "label" ? colors.blue : colors.white}
        >
          <StyledContentWrapper>
            <A.Icon
              name={"label"}
              color={location !== "label" ? "black" : "white"}
            />
            <A.Text
              fontSize={"small"}
              color={location !== "label" ? "black" : "white"}
              hover={false}
            >
              Label
            </A.Text>
            {!location && (
              <A.Text
                backgroundColor={"grey"}
                fontSize={"small"}
                rounded
                margin={"0"}
                padding={"2px 5px"}
              >
                {labelState?.labels?.length}
              </A.Text>
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
          borderColor={"#d1d5da"}
          rounded
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
              hover={false}
            >
              Milestone
            </A.Text>
            {!location && (
              <A.Text
                backgroundColor={"grey"}
                fontSize={"small"}
                rounded
                margin={"0"}
                padding={"2px 5px"}
              >
                {milestoneState?.milestones?.length}
              </A.Text>
            )}
          </StyledContentWrapper>
        </A.Button>
      </Link>
    </StyledNavigationWrapperLink>
  );
};

export default NavigationWrapperLink;

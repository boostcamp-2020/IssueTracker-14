import React from "react";
import { Link } from "react-router-dom";
import colors from "@constants/colors";
import A from "@atoms/index";
import Store from "@stores/index";
import Styled from "./NavigationWrapperLink.style";

const NavigationWrapperLink = ({ location }) => {
  const labelState = Store.useLabelState();
  const milestoneState = Store.useMilestoneState();
  return (
    <Styled.NavigationWrapperLink>
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
          <Styled.ContentWrapper>
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
          </Styled.ContentWrapper>
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
          <Styled.ContentWrapper>
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
          </Styled.ContentWrapper>
        </A.Button>
      </Link>
    </Styled.NavigationWrapperLink>
  );
};

export default NavigationWrapperLink;

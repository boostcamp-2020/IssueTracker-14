import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

const StyledLine = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(color) => colors[color]};
`;

const Line = ({ color }) => {
  return <StyledLine color={color} />;
};

export default Line;

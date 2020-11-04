import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

const StyledText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => colors[color]};
  font-weight: ${({ fontWeight }) => fontWeight === "bold" && "bold"};
  font-size: ${({ fontSize }) => fontSize};
  cursor: pointer;

  margin: 0;
  padding: 0;

  &:hover {
    color: ${colors.blue};
  }
`;

const Text = ({ children, color, fontSize, fontWeight, ...rest }) => (
  <StyledText
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
    {...rest}
  >
    {children}
  </StyledText>
);

Text.defaultProps = {
  color: "black",
  fontSize: "medium",
};

export default Text;

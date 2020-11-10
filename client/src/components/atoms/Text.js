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
  margin: 0.3rem;
  padding: 0;
  &:hover {
    color: ${({ hover }) => hover && colors.blue};
  }
`;

const Text = ({ children, color, fontSize, fontWeight, hover, ...rest }) => (
  <StyledText
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
    hover={hover}
    {...rest}
  >
    {children}
  </StyledText>
);

Text.defaultProps = {
  color: "black",
  fontSize: "medium",
  hover: true,
};

export default Text;

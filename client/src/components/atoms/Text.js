import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

const StyledText = styled.p`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  text-align: ${({ align }) => align};
  color: ${({ color }) => colors[color]};
  font-weight: ${({ fontWeight }) => fontWeight === "bold" && "bold"};
  font-size: ${({ fontSize }) => fontSize};
  cursor: ${({ cursor }) => cursor};
  margin: 0.3rem;
  padding: ${({ padding }) => padding};
  &:hover {
    color: ${({ hover }) => hover && colors.blue};
  }
  display: ${({ display }) => display};
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
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
  cursor: "pointer",
  align: "center",
  padding: 0,
};

export default Text;

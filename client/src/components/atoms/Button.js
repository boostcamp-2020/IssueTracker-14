import React from "react";

import styled from "styled-components";
import colors from "../../constants/colors";

const StyledButton = styled.button`
  box-sizing: border-box;
  outline: none;
  border: ${({ border }) => (border === true ? 1 : 0)}px solid
    ${({ borderColor }) => borderColor};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  font-size: ${({ size }) =>
    size === "big" ? 16 : size === "medium" ? 12 : 8}px;
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  color: ${({ color }) => colors[color]};
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  cursor: ${(cursor) => cursor};
  text-align: ${({ textAlign }) => textAlign};

  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent || undefined};

  &:hover {
    background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  }

  &:active {
    background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  }
`;

const Button = ({
  width,
  height,
  padding,
  rounded,
  backgroundColor,
  color,
  icon,
  onClick,
  children,
  textAlign,
  cursor,
  ...rest
}) => (
  <StyledButton
    width={width}
    height={height}
    padding={padding}
    rounded={rounded}
    color={color}
    backgroundColor={backgroundColor}
    onClick={onClick}
    textAlign={textAlign}
    cursor={cursor}
    {...rest}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = {
  size: "medium",
  border: false,
  borderColor: "#959da5",
  rounded: true,
  icon: undefined,
  color: "black",
  backgroundColor: "white",
  label: "기본 버튼",
  textAlign: "center",
  cursor: "pointer",
  display: "block",
};

export default Button;

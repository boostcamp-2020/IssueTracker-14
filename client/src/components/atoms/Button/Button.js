import React from "react";
import Styled from "./Button.style";

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
  hexa,
  disabled,
  hover,
  ...rest
}) => (
  <Styled.Button
    width={width}
    height={height}
    padding={padding}
    rounded={rounded}
    color={color}
    backgroundColor={backgroundColor}
    onClick={onClick}
    textAlign={textAlign}
    cursor={cursor}
    hexa={hexa}
    disabled={disabled}
    hover={hover}
    {...rest}
  >
    {children}
  </Styled.Button>
);

Button.defaultProps = {
  size: "medium",
  border: false,
  borderColor: "#959da5",
  rounded: true,
  icon: undefined,
  color: "black",
  backgroundColor: "transparent",
  label: "기본 버튼",
  textAlign: "center",
  cursor: "pointer",
  display: "block",
  width: "100%",
  height: "2rem",
  hexa: "false",
  disabled: false,
};

export default Button;

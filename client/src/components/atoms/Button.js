import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

const StyledButton = styled.button`
  box-sizing: border-box;
  outline: none;
  border: ${({ border }) => (border === true ? 1 : 0)}px solid #959da5;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  padding: 0
    ${({ size }) => (size === "big" ? 40 : size === "medium" ? 20 : 10)}px;
  font-size: ${({ size }) =>
    size === "big" ? 16 : size === "medium" ? 12 : 8}px;
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  color: ${({ color }) => colors[color]};
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  cursor: pointer;

  span {
    margin: 0 5px 0 0;
  }

  &:hover {
    background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  }

  &:active {
    background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  }

  & + & {
    margin-left: 1rem;
  }

  padding: 0;
  margin: 0;
`;

const Button = ({
  width,
  height,
  rounded,
  backgroundColor,
  color,
  icon,
  onClick,
  children,
  ...rest
}) => (
  <StyledButton
    width={width}
    height={height}
    rounded={rounded}
    color={color}
    backgroundColor={backgroundColor}
    onClick={onClick}
    {...rest}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = {
  size: "medium",
  border: false,
  rounded: true,
  icon: undefined,
  color: "black",
  backgroundColor: "white",
  label: "기본 버튼",
};

export default Button;

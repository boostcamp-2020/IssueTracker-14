import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

const StyledButton = styled.button`
  box-sizing: border-box;
  outline: none;
  border: ${({ border }) => (border === true ? 1 : 0)}px solid #959da5;
  height: ${({ size }) =>
    size === "big" ? 48 : size === "medium" ? 24 : 12}px;
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
`;

const Button = ({
  size,
  rounded,
  backgroundColor,
  onClick,
  color,
  icon,
  children,
  ...rest
}) => (
  <StyledButton
    size={size}
    rounded={rounded}
    color={color}
    backgroundColor={backgroundColor}
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

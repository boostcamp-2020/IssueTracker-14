import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  outline: none;
  box-sizing: border-box;
  border: 1px solid #d1d5da;
  height: ${({ size }) =>
    size === "big" ? 48 : { size } === "medium" ? 24 : 12}px;
  margin: 0
    ${({ size }) => (size === "big" ? 40 : { size } === "medium" ? 20 : 10)}px;
  font-size: ${({ size }) =>
    size === "big" ? 16 : { size } === "medium" ? 12 : 8}px;
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  color: #000000;
`;

const Input = ({ type, placeholder, size, rounded, id }) => (
  <StyledInput
    type={type}
    placeholder={placeholder}
    size={size}
    rounded={rounded}
    id={id}
  />
);

Input.defaultProps = {
  size: "medium",
  rounded: false,
  placeholder: "",
};

export default Input;

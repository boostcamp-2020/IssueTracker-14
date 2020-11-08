import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  outline: none;
  box-sizing: border-box;
  border: 1px solid #d1d5da;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  color: #000000;
  width: 80%;
  height: 55%;
`;

const Input = ({ type, placeholder, name, margin, padding, fontSize, rounded, id, onChange }) => (
  <StyledInput
    type={type}
    placeholder={placeholder}
    margin={margin}
    padding={padding}
    fontSize={fontSize}
    rounded={rounded}
    id={id}
    name={name}
    onChange={onChange}
  />
);

Input.defaultProps = {
  margin: "0.75rem",
  padding: "0.75rem",
  fontSize: "0.75rem",
  rounded: false,
  placeholder: "",
};

export default Input;

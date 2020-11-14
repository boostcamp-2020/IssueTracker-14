import React from "react";
import Styled from "./Input.style";

const Input = ({
  type,
  placeholder,
  name,
  width,
  margin,
  padding,
  fontSize,
  rounded,
  id,
  onChange,
  value,
  ...rest
}) => (
  <Styled.Input
    type={type}
    placeholder={placeholder}
    margin={margin}
    padding={padding}
    fontSize={fontSize}
    rounded={rounded}
    id={id}
    name={name}
    width={width}
    onChange={onChange}
    value={value}
    {...rest}
  />
);

Input.defaultProps = {
  fontSize: "0.75rem",
  rounded: false,
  placeholder: "",
  height: "2.3rem",
  value: undefined,
};

export default Input;

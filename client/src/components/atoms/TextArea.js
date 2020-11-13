import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

const StyledTextArea = styled.textarea`
  outline: none;
  box-sizing: border-box;
  border: 1px solid #d1d5da;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  color: #000000;
  background-color: ${({ bgColor }) => (bgColor ? colors[bgColor] : "inherit")};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const TextArea = ({
  placeholder,
  width,
  height,
  rows,
  name,
  filePath,
  value,
  defaultValue,
  ...rest
}) => {
  return (
    <StyledTextArea
      placeholder={placeholder}
      rows={rows}
      name={name}
      width={width}
      height={height}
      value={value}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

TextArea.defaultProps = {
  padding: "0.75rem",
  fontSize: "0.75rem",
  rounded: false,
  placeholder: "",
};

export default TextArea;

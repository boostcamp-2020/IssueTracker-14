import React from "react";
import Styled from "./TextArea.style";

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
    <Styled.TextArea
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

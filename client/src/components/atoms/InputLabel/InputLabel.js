import React from "react";
import A from "@atoms/index";
import Styled from "./InputLabel.style";

const InputLabel = ({
  fontSize,
  height,
  padding,
  margin,
  htmlFor,
  label,
  fontWeight,
  ...rest
}) => (
  <Styled.InputLabel
    htmlFor={htmlFor}
    fontSize={fontSize}
    height={height}
    padding={padding}
    margin={margin}
  >
    <A.Text hover={false} fontWeight={fontWeight} fontSize={fontSize}>
      {label}
    </A.Text>
  </Styled.InputLabel>
);

InputLabel.defaultProps = {
  padding: "0rem",
  // margin: "0.1rem 0rem",
  height: "1rem",
  fontSize: "medium",
  label: "기본 라벨",
  fontWeight: "bold",
  cursor: "default",
};

export default InputLabel;

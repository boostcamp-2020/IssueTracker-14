import React from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledInputLabel = styled.label`
  box-sizing: border-box;
  outline: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  color: #000000;
  font-weight: ${({ fontWeight }) => fontWeight};
  width: 80%;
  padding: 0;
`;

const InputLabel = ({ fontSize, height, padding, margin, htmlFor, label }) => (
  <StyledInputLabel
    htmlFor={htmlFor}
    fontSize={fontSize}
    height={height}
    padding={padding}
    margin={margin}
  >
    <A.Text hover={false} fontWeight={"bold"}>
      {label}
    </A.Text>
  </StyledInputLabel>
);

InputLabel.defaultProps = {
  padding: "0rem",
  // margin: "0.1rem 0rem",
  height: "1rem",
  fontSize: "medium",
  label: "기본 라벨",
  fontWeight: "bold",
};

export default InputLabel;

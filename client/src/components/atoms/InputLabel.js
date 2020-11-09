import React from "react";
import styled from "styled-components";

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
  font-weight: bold;
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
    <div>{label}</div>
  </StyledInputLabel>
);

InputLabel.defaultProps = {
  padding: "0rem",
  // margin: "0.1rem 0rem",
  height: "0.5rem",
  fontSize: "14px",
  label: "기본 라벨",
};

export default InputLabel;

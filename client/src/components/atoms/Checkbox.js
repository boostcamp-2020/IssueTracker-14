import React from "react";
import styled from "styled-components";

const StyledCheckbox = styled.input`
  transform: scale(${({ scale }) => scale});
`;

const Checkbox = ({ scale, onClick, checked }) => (
  <StyledCheckbox
    type="checkbox"
    checked={checked}
    scale={scale}
    onChange={onClick}
  />
);

Checkbox.defaultProps = {
  scale: "1",
};

export default Checkbox;

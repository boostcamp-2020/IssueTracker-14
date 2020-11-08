import React from "react";
import styled from "styled-components";

const StyledCheckbox = styled.input`
    transform: scale(${({scale}) => scale});
`;

const Checkbox = ({ scale }) => (
  <StyledCheckbox type="checkbox" scale={scale} />
);

Checkbox.defaultProps = {
  scale: "1"
};

export default Checkbox;

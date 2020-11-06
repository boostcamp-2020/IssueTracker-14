import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  box-sizing: border-box;
  outline: none;
  display: flex;
  align-items: center;
  font-size: ${props => (props.size==="big" ? 16 : props.size==="medium" ? 12 : 8)}px;
  height: ${props => (props.size==="big" ? 48 : props.size==="medium" ? 24 : 12)}px;
  padding: 0 ${props => props.size==="big" ? 40 : props.size==="medium" ? 20 : 10}px;
  color: #000000;
  font-weight: bold;
`;

const Label = props => (
  <StyledLabel
    htmlFor={props.for}
    size={props.size}>
    <div>{props.label}</div>
  </StyledLabel>
);

Label.defaultProps = {
  size: "medium",
  label: "기본 라벨"
};

export default Label;
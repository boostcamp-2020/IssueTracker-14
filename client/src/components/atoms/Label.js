import React from "react";
import styled from "styled-components";
import decideFontColorFromHexa from "../../utils/decideFontColorFromHexa"

const StyledLabel = styled.button`
  box-sizing: border-box;
  border: 1px solid transparent;
  height: 1.25rem;
  font-size: 0.85rem;
  width: ${({ children }) => (children.length - 1) * 0.6 + 1.25}rem;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  border-radius: 2em;
  color: ${({ backgroundHexaColor }) => decideFontColorFromHexa(backgroundHexaColor)};
  background-color: ${({ backgroundHexaColor }) => backgroundHexaColor};
  cursor: ${({ cursor }) => cursor};
`;

const Label = ({
  children,
  padding,
  margin,
  backgroundHexaColor,
  cursor,
  onClick,
  ...rest
}) => (
  <StyledLabel
    padding={padding}
    margin={margin}
    backgroundHexaColor={backgroundHexaColor}
    cursor={cursor}
    onClick={onClick}
    children={children}
    {...rest}
  >
    {children}
  </StyledLabel>
);

Label.defaultProps = {
  padding: "0rem",
  margin: "0rem",
  backgroundHexaColor: "#959da5",
  cursor: "pointer",
};

export default Label;

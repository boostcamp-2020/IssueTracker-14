import React from "react";
import styled from "styled-components";

const hexaToRGB = (hex) => {
  const hexaR = hex.slice(1, 3);
  const hexaG = hex.slice(3, 5);
  const hexaB = hex.slice(5, 7);
  const changeColor = (c) => {
    const first = c.slice(0, 1);
    const second = c.slice(1, 2);
    return parseInt(first, 16) * 16 + parseInt(second, 16);
  };
  const R = changeColor(hexaR);
  const G = changeColor(hexaG);
  const B = changeColor(hexaB);
  const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

const StyledLabel = styled.button`
  box-sizing: border-box;
  border: 1px solid transparent;
  height: 1.25rem;
  font-size: 0.85rem;
  width: ${({ children }) => (children?.length - 1) * 0.6 + 1.25}rem;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  border-radius: 2em;
  color: ${({ backgroundHexaColor }) => hexaToRGB(backgroundHexaColor)};
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

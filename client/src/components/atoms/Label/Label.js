import React from "react";
import Styled from "./Label.style";

const Label = ({
  children,
  padding,
  margin,
  backgroundHexaColor,
  cursor,
  onClick,
  ...rest
}) => (
  <Styled.Label
    padding={padding}
    margin={margin}
    backgroundHexaColor={backgroundHexaColor}
    cursor={cursor}
    onClick={onClick}
    children={children}
    {...rest}
  >
    {children}
  </Styled.Label>
);

Label.defaultProps = {
  padding: "0rem",
  margin: "0rem",
  backgroundHexaColor: "#959da5",
  cursor: "pointer",
  children: null,
};

export default Label;

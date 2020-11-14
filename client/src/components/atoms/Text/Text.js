import React from "react";
import Styled from "./Text.style";

const Text = ({ children, color, fontSize, fontWeight, hover, ...rest }) => (
  <Styled.Text
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
    hover={hover}
    {...rest}
  >
    {children}
  </Styled.Text>
);

Text.defaultProps = {
  color: "black",
  fontSize: "medium",
  hover: true,
  cursor: "pointer",
  align: "center",
  padding: 0,
  margin: "0.3rem",
};

export default Text;

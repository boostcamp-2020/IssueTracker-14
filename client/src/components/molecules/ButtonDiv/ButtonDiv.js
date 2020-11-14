import React from "react";
import A from "@atoms/index";
import Styled from "./ButtonDiv.style";

const ButtonDiv = ({
  onClick,
  buttonColor,
  width,
  height,
  textColor,
  fontSize,
  hover,
  children,
  margin,
  ...rest
}) => {
  return (
    <Styled.ButtonDiv width={width} height={height} margin={margin}>
      <A.Button
        border
        backgroundColor={buttonColor}
        width={width}
        height={height}
        onClick={onClick}
      >
        <A.Text color={textColor} fontSize={fontSize} hover={hover}>
          {children}
        </A.Text>
      </A.Button>
    </Styled.ButtonDiv>
  );
};

export default ButtonDiv;

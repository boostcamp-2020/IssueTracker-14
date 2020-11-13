import React from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
`;

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
    <StyledButtonDiv width={width} height={height} margin={margin}>
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
    </StyledButtonDiv>
  );
};

export default ButtonDiv;

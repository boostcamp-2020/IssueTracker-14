import React from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 100px;
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
  ...rest
}) => {
  return (
    <StyledButtonDiv>
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

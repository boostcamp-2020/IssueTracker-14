import React from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import styled from "styled-components";

const StyledLogInLinkBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
`;

const LogInLinkBar = ({ size }) => (
  <StyledLogInLinkBar>
    <Button
      size={size}
      color="blue"
      backgroundColor="transparent"
      border={false}
      label="로그인"
    >
      <Text color="black" fontSize="medium">
        로그인
      </Text>
    </Button>
    <Button
      size={size}
      color="blue"
      backgroundColor="transparent"
      border={false}
      label="회원가입"
    >
      회원가입
    </Button>
  </StyledLogInLinkBar>
);

export default LogInLinkBar;

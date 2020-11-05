import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

const StyledSignUpButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 80%;
`;

const SignUpButton = () => (
  <StyledSignUpButton>
    <Button border backgroundColor={"grey"} width={"100%"} height={"60%"}>
      <Text color={"black"} fontSize={"small"} hover={false}>
        회원가입
      </Text>
    </Button>
  </StyledSignUpButton>
);

export default SignUpButton;

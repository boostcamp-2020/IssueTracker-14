import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

import A from "../atoms/index";

const StyledLoginButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 80%;
`;

const LoginButton = ({ onClick }) => (
  <StyledLoginButton>
    <A.Button
      border
      backgroundColor={colors.grey}
      width={"100%"}
      height={"70%"}
      onClick={onClick}
    >
      <Text color={colors.black} fontSize={"small"} hover={false}>
        IssueTracker team 14에 로그인하기
      </Text>
    </A.Button>
  </StyledLoginButton>
);

export default LoginButton;

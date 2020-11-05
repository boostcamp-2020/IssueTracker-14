import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";

const StyledLoginButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 80%;
`;

const GithubLoginButton = ({ onClick }) => (
  <StyledLoginButton>
    <Button
      border
      backgroundColor={"black"}
      width={"100%"}
      height={"70%"}
      onClick={onClick}
    >
      <Text color={"white"} fontSize={"small"} hover={false}>
        Github으로 로그인하기
        <Icon location={"right"} name={"github"} distance={"0.3"} />
      </Text>
    </Button>
  </StyledLoginButton>
);

export default GithubLoginButton;

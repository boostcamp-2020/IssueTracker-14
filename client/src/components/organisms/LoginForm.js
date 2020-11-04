import React from "react";
import Text from "../atoms/Text";
import FormDiv from "../molecules/FormDiv";
import LoginButton from "../molecules/LoginButton";
import GithubLoginButton from "../molecules/GithubLoginButton";
import LoginLinkBar from "../molecules/LoginLinkBar";
import styled from "styled-components";
import colors from "../../constants/colors";

const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 40%;
  background-color: white;
  box-sizing: border-box;
  border-radius: 0.4rem;
`;

const LoginForm = ({ size }) => (
  <StyledLoginForm>
    <FormDiv label="아이디" size={size} for="input-id" type="email" />
    <FormDiv label="비밀번호" size={size} for="input-pw" type="password" />
    <LoginButton />
    <GithubLoginButton />
    <Text color={colors.black} fontSize={"small"}>
      아직 회원이 아니라면? 회원가입 하러가기
    </Text>
  </StyledLoginForm>
);

export default LoginForm;

import React, { useReducer, useCallback } from "react";
import colors from "./../../constants/colors";
import styled from "styled-components";
import M from "../../components/molecules/index";
import LoginForm from "../../components/organisms/LoginForm";

const LoginPageWrapper = styled.div`
  display: flex;
  background-color: ${colors.lightGrey};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 62.5%;
`;

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <M.Title>이슈트래커</M.Title>
      <LoginForm />
    </LoginPageWrapper>
  );
};

export default LoginPage;

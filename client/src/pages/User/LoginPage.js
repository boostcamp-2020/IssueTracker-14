import React, { useReducer, useCallback } from "react";
import styled from "styled-components";
import Title from "../../components/organisms/Title";
import LoginForm from "../../components/organisms/LoginForm";

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 930px;
`;

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <Title />
      <LoginForm />
    </LoginPageWrapper>
  );
};

export default LoginPage;

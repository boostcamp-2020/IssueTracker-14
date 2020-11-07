import React, { useReducer, useCallback } from "react";
import colors from "./../../constants/colors";
import styled from "styled-components";
import Title from "../../components/organisms/Title";
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
      <Title />
      <LoginForm />
    </LoginPageWrapper>
  );
};

export default LoginPage;

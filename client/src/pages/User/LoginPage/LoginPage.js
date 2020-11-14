import React from "react";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./LoginPage.style";

const LoginPage = () => {
  return (
    <Styled.LoginPageWrapper>
      <M.Title>이슈트래커</M.Title>
      <O.LoginForm />
    </Styled.LoginPageWrapper>
  );
};

export default LoginPage;

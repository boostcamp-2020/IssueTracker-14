import React from "react";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./SignUpPage.style";

const SignUpPage = () => (
  <Styled.SignUpPageWrapper>
    <M.Title>이슈트래커</M.Title>
    <O.SignUpForm />
  </Styled.SignUpPageWrapper>
);

export default SignUpPage;

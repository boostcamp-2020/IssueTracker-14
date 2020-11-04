import React from "react";
import styled from "styled-components";
import Title from "../../components/organisms/Title";
import SignUpForm from "../../components/organisms/SignUpForm";

const SignUpPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 930px;
`;

const SignUpPage = () => (
  <SignUpPageWrapper>
    <Title />
    <SignUpForm />
  </SignUpPageWrapper>
);

export default SignUpPage;

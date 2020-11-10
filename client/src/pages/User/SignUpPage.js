import React from "react";
import colors from "./../../constants/colors";
import styled from "styled-components";
import Title from "../../components/molecules/Title";
import SignUpForm from "../../components/organisms/SignUpForm";

const SignUpPageWrapper = styled.div`
  display: flex;
  background-color: ${colors.lightGrey};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 62.5%;
`;

const SignUpPage = () => (
  <SignUpPageWrapper>
    <Title>이슈트래커</Title>
    <SignUpForm />
  </SignUpPageWrapper>
);

export default SignUpPage;

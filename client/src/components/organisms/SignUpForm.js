import React from "react";
import FormDiv from "../molecules/FormDiv";
import SignUpButton from "../molecules/SignUpButton";
import styled from "styled-components";

const StyledSignUpForm = styled.div`
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

const SignUpForm = ({ size }) => (
  <StyledSignUpForm>
    <FormDiv label="아이디" size={size} for="input-id" type="email" />
    <FormDiv label="닉네임" size={size} for="input-nickname" type="text" />
    <FormDiv label="비밀번호" size={size} for="input-pw" type="password" />
    <FormDiv label="비밀번호 확인" size={size} for="input-pw-check" type="password" />
    <SignUpButton />
  </StyledSignUpForm>
);

export default SignUpForm;

import React from "react";
import Text from "../atoms/Text";
import FormDiv from "../molecules/FormDiv";
import LoginButton from "../molecules/LoginButton";
import GithubLoginButton from "../molecules/GithubLoginButton";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const LoginForm = ({ size, onChange, onClick }) => (
  <StyledLoginForm>
    <FormDiv
      label="아이디"
      size={size}
      for="input-id"
      type="email"
      onChange={onChange}
      name={"nickname"}
    />
    <FormDiv
      label="비밀번호"
      size={size}
      for="input-pw"
      type="password"
      onChange={onChange}
      name={"password"}
    />
    <LoginButton onClick={onClick} />
    <GithubLoginButton />
    <Link to="/signup">
      <Text color="black" fontSize="small">
        아직 회원이 아니라면? 회원가입 하러가기
      </Text>
    </Link>
  </StyledLoginForm>
);

export default LoginForm;

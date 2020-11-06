import React, { useReducer, useCallback } from "react";
import styled from "styled-components";
import Title from "../../components/organisms/Title";
import LoginForm from "../../components/organisms/LoginForm";
import myAxios from "../../utils/myAxios";
import { useUserState, useUserDispatch } from "../../stores/user";

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 930px;
`;

const LoginPage = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onClickLocalLogin = useCallback(() => {
    dispatch({
      type: "POST_USER",
    });
  }, []);

  const onClickGithubLogin = useCallback(() => {
    dispatch({
      type: "POST_GITHUB_USER",
    });
  }, []);

  return (
    <LoginPageWrapper>
      <Title />
      <LoginForm onChange={onChange} onClick={onClickLocalLogin} />
    </LoginPageWrapper>
  );
};

export default LoginPage;

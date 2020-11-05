import React, { useReducer, useCallback } from "react";
import axios from "axios";
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

const initialState = {
  inputs: {
    nickname: "",
    password: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "POST_USER":
      const body = {
        nickname: state.inputs.nickname,
        password: state.inputs.password,
      };
      console.log(body.nickname, body.password);
      const { message, token } = axios.post(
        "http://115.85.183.106:3000/api/user/login",
        body
      );
      console.log(message, token);
    default:
      return state;
  }
}

const LoginPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { nickname, password } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(e.target);
    console.log("name", name, "value", value);
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onClick = useCallback((e) => {
    console.log(e);
    dispatch({
      type: "POST_USER",
    });
  }, []);

  return (
    <LoginPageWrapper>
      <Title />
      <LoginForm onChange={onChange} onClick={onClick} />
    </LoginPageWrapper>
  );
};

export default LoginPage;

import React, { useReducer, useCallback } from "react";
import styled from "styled-components";
import Title from "../../components/organisms/Title";
import LoginForm from "../../components/organisms/LoginForm";
import myAxios from "../../utils/myAxios";

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

const reducer = (state, action) => {
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
      const checkUserInfo = async () => {
        const { data: { message, token } } = await myAxios.post('/user/login', body);
        if (message === "success"){
          localStorage.setItem("token", token);
          location.href = "/";
        }
      }
      checkUserInfo();
    default:
      return state;
  }
}

const LoginPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onClick = useCallback(() => {
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

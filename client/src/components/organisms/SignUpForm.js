import React, { useCallback } from "react";
import FormDiv from "../molecules/FormDiv";
import SignUpButton from "../molecules/SignUpButton";
import styled from "styled-components";
import { useUserDispatch } from "../../stores/user";

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

const SignUpForm = ({ size }) => {
  const dispatch = useUserDispatch();

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_SIGNUP_INPUT",
      name,
      value,
    });
  }, []);

  const onClickSignup = useCallback(() => {
    console.log("click");
    dispatch({
      type: "POST_SIGNUP_USER",
    });
  });

  return (
    <StyledSignUpForm>
      <FormDiv
        label={"아이디"}
        size={size}
        for={"input-id"}
        type={"email"}
        onChange={onChange}
        name={"email"}
      />
      <FormDiv
        label={"닉네임"}
        size={size}
        for={"input-nickname"}
        type={"text"}
        onChange={onChange}
        name={"nickname"}
      />
      <FormDiv
        label={"비밀번호"}
        size={size}
        for={"input-pw"}
        type={"password"}
        onChange={onChange}
        name={"password"}
      />
      <FormDiv
        label={"비밀번호 확인"}
        size={size}
        for={"input-pw-check"}
        type={"password"}
        onChange={onChange}
        name={"passwordConfirm"}
      />
      <SignUpButton onClick={onClickSignup} />
    </StyledSignUpForm>
  );
};

export default SignUpForm;

import React, { useCallback } from "react";
import M from "../molecules/index";
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

const SignUpForm = () => {
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
      <M.FormDiv
        label={"아이디"}
        for={"input-id"}
        type={"email"}
        onChange={onChange}
        name={"email"}
      />
      <M.FormDiv
        label={"닉네임"}
        for={"input-nickname"}
        type={"text"}
        onChange={onChange}
        name={"nickname"}
      />
      <M.FormDiv
        label={"비밀번호"}
        for={"input-pw"}
        type={"password"}
        onChange={onChange}
        name={"password"}
      />
      <M.FormDiv
        label={"비밀번호 확인"}
        for={"input-pw-check"}
        type={"password"}
        onChange={onChange}
        name={"passwordConfirm"}
      />
      <M.ButtonDiv
        buttonColor={colors.grey}
        width={"100%"}
        height={"60%"}
        onClick={onClickSignup}
        textColor={colors.black}
        fontSize={"small"}
        hover={false}
      >
        회원가입
      </M.ButtonDiv>
    </StyledSignUpForm>
  );
};

export default SignUpForm;

import React, { useCallback } from "react";
import M from "@molecules/index";
import Store from "@stores/index";
import Styled from "./SignUpForm.style";

const SignUpForm = () => {
  const dispatch = Store.useUserDispatch();

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_SIGNUP_INPUT",
      name,
      value,
    });
  }, []);

  const onClickSignup = useCallback(() => {
    dispatch({
      type: "POST_SIGNUP_USER",
    });
  });

  return (
    <Styled.SignUpForm>
      <Styled.SignupFormDivWrapper>
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
          buttonColor={"grey"}
          width={"100%"}
          height={"80%"}
          onClick={onClickSignup}
          textColor={"black"}
          fontSize={"small"}
          hover={false}
        >
          회원가입
        </M.ButtonDiv>
      </Styled.SignupFormDivWrapper>
    </Styled.SignUpForm>
  );
};

export default SignUpForm;

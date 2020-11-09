import React, { useCallback } from "react";
import colors from "../../constants/colors";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import { Link } from "react-router-dom";
import { useUserDispatch } from "../../stores/user";

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

const LoginForm = ({ size }) => {
  const dispatch = useUserDispatch();

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_LOGIN_INPUT",
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
    <StyledLoginForm>
      <M.FormDiv
        label="아이디"
        for="input-id"
        type="email"
        onChange={onChange}
        name={"nickname"}
      />
      <M.FormDiv
        label="비밀번호"
        for="input-pw"
        type="password"
        onChange={onChange}
        name={"password"}
      />
      <M.ButtonDiv
        buttonColor={colors.grey}
        width={"100%"}
        height={"70%"}
        onClick={onClickLocalLogin}
        textColor={colors.black}
        fontSize={"small"}
        hover={false}
      >
        IssueTracker team 14에 로그인하기
      </M.ButtonDiv>
      <M.ButtonDiv
        buttonColor={colors.black}
        width={"100%"}
        height={"70%"}
        onClick={onClickGithubLogin}
        textColor={"white"}
        fontSize={"small"}
        hover={false}
      >
        Github으로 로그인하기
        <A.Icon location={"right"} name={"github"} distance={"0.3"} />
      </M.ButtonDiv>
      <Link to="/signup">
        <A.Text color="black" fontSize="small">
          아직 회원이 아니라면? 회원가입 하러가기
        </A.Text>
      </Link>
    </StyledLoginForm>
  );
};

export default LoginForm;

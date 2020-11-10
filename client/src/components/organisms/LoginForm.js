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
  width: 40%;
  height: 40%;
  padding: 0.5rem;
  background-color: white;
  box-sizing: border-box;
  border-radius: 0.4rem;
`;

const StyledLoginFormDivWrapper = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      <StyledLoginFormDivWrapper>
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
          height={"2.2rem"}
          onClick={onClickLocalLogin}
          textColor={colors.black}
          fontSize={"small"}
          hover={false}
          margin={"0.3rem"}
        >
          IssueTracker team 14에 로그인하기
        </M.ButtonDiv>

        <M.ButtonDiv
          buttonColor={colors.black}
          width={"100%"}
          height={"2.2rem"}
          textColor={"white"}
          fontSize={"small"}
          hover={false}
          margin={"0.3rem"}
        >
          Github으로 로그인하기
          <A.Icon location={"right"} name={"github"} distance={"0.3"} />
        </M.ButtonDiv>

        <Link to="/signup">
          <A.Text color="black" fontSize="small">
            아직 회원이 아니라면? 회원가입 하러가기
          </A.Text>
        </Link>
      </StyledLoginFormDivWrapper>
    </StyledLoginForm>
  );
};

export default LoginForm;

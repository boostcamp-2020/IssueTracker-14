import React, { useCallback } from "react";
import styled from "styled-components";
import A from "../../atoms/index";
import M from "../../molecules/index";
import colors from "../../../constants/colors";
import { Link } from "react-router-dom";
import Store from "../../../stores/index";

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

const LoginForm = () => {
  const userDispatch = Store.useUserDispatch();

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    userDispatch({
      type: "CHANGE_LOGIN_INPUT",
      name,
      value,
    });
  }, []);

  const onClickLocalLogin = useCallback(() => {
    userDispatch({
      type: "POST_USER",
    });
  }, []);

  const GithubLoginUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/user/oauth/github"
      : "http://115.85.183.106:3000/api/user/oauth/github";

  return (
    <StyledLoginForm>
      <StyledLoginFormDivWrapper>
        <M.FormDiv
          label={"아이디"}
          for={"input-id"}
          type={"text"}
          onChange={onChange}
          name={"nickname"}
          rounded
        />
        <M.FormDiv
          label={"비밀번호"}
          for={"input-pw"}
          type={"password"}
          onChange={onChange}
          name={"password"}
          rounded
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
        <a
          href={`${GithubLoginUrl}`}
          style={{ display: "block", width: "100%", margin: 0, padding: 0 }}
        >
          <M.ButtonDiv
            buttonColor={colors.black}
            width={"100%"}
            height={"2.2rem"}
            textColor={"white"}
            fontSize={"small"}
            hover={false}
          >
            Github으로 로그인하기
            <A.Icon location={"right"} name={"github"} distance={"0.3"} />
          </M.ButtonDiv>
        </a>
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

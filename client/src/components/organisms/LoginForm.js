import React, { useState, useCallback } from "react";
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

const LoginForm = () => {
  const dispatch = useUserDispatch();
  const [nickname,setNickname] = useState("");
  const [password,setPassword] = useState("");

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_LOGIN_INPUT",
      name,
      value,
    });
    switch (name) {
      case "nickname":
        setNickname(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
    
  }, []);

  const onClickLocalLogin = useCallback(() => {
    const nicknameError = [];
    const passwordError = [];

    if (nickname.length<6 || nickname.length>12){
      nicknameError.push("닉네임은 6글자 이상 12글자 이하로 입력해주세요.");
    }

    if (password.length<6 || password.length>12){
      passwordError.push("비밀번호는 6글자 이상 12글자 이하로 입력해주세요.");
    }

    alert(nickname);
    alert(password);

    if (nicknameError.length===0&&passwordError.length===0) {
      dispatch({
        type: "POST_USER",
      }) ;
    } else {
      alert(`${nicknameError.length!==0 && nicknameError[0]}\n${passwordError.length!==0 && passwordError[0]}`)
    }
  }, []);

  const GithubLoginUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/user/oauth/github"
      : "http://115.85.183.106:3000/api/user/oauth/github";
  return (
    <StyledLoginForm>
      <StyledLoginFormDivWrapper>
        <M.FormDiv
          label="아이디"
          for="input-id"
          type="text"
          onChange={onChange}
          name={"nickname"}
          value={nickname}
        />
        <M.FormDiv
          label="비밀번호"
          for="input-pw"
          type="password"
          onChange={onChange}
          name={"password"}
          value={password}
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

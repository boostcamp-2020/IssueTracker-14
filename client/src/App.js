import React, { useState } from "react";
import LoginPage from "./pages/User/LoginPage";
import SignUpPage from "./pages/User/SignUpPage";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import colors from "./constants/colors";

import axios from "axios";
import { AuthContext } from "./stores/auth";

const StyledRootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.lightGrey};
  margin: 0;
  padding: 0;
  font-size: 62.5%;
`;

const App = () => {
  // TODO: Router 설정 , checkLogin 후 분기
  const token = localStorage.getItem("token");
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  if (!token) {
  }

  if (token) {
    axios
      .get("http://localhost:3000/api/user/status", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(({ data: { message } }) => {
        console.log(message);
        console.log(isAuth);
        if (message === "ok") {
          setIsAuth(true);
        }
      })
      .catch();
  }

  const setTokens = (data) => {
    localStorage.setItem("token", data);
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ isAuth }}>
      <StyledRootContainer>
        <Link to={"/login"}>로그인페이지 테스트</Link>
        <Switch>
          <Route exact path="/" component={isAuth ? SignUpPage : LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route eact path="/issues" component={SignUpPage} />
        </Switch>
        {/*
        <Route exact path="/issues/new" component={LoginForm} />
        <Route exact path="/issues/:issueid" component={LoginForm} />
        <Route exact path="/labels" component={LoginForm} />
        <Route exact path="/milestones" component={LoginForm} />
        <Route path="/milestones/new" component={LoginForm} />
        <Route path="/milestones/edit/:milestoneid" component={LoginForm} />
      */}
      </StyledRootContainer>
    </AuthContext.Provider>
  );
};

export default App;

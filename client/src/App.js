import React, { useState, useEffect } from "react";
import LoginPage from "./pages/User/LoginPage";
import SignUpPage from "./pages/User/SignUpPage";
import IssuesPage from "./pages/Issue/IssuesPage";
import NewIssuePage from "./pages/Issue/NewIssuePage";
import { Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import myAxios from "./utils/myAxios";
import { AuthContext } from "./stores/auth";
import { UserProvider } from "./stores/user";

const StyledRootContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 62.5%;
`;

const App = () => {
  const token = localStorage.getItem("token");
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  const checkToken = async () => {
    const {
      data: { message },
    } = await myAxios.get("/user/status");
    if (message === "ok") {
      setIsAuth(true);
      return true;
    }
    return false;
  };

  useEffect(async () => {
    if (!token) {
      history.push("/login");
    }
    if (token) {
      try {
        await checkToken();
        history.push("/");
      } catch (err) {
        history.push("/login");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={isAuth}>
      <StyledRootContainer>
        <Switch>
          <UserProvider>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/" component={NewIssuePage} />
            {/* <Route exact path="/" component={IssuesPage} /> */}
          </UserProvider>
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

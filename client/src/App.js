import React, { useState, useEffect } from "react";
import LoginPage from "./pages/User/LoginPage";
import SignUpPage from "./pages/User/SignUpPage";
import IssuesPage from "./pages/User/IssuesPage";
import { Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import colors from "./constants/colors";
import myAxios from "./utils/myAxios";
import { AuthContext } from "./stores/auth";
import { UserProvider } from "./stores/user";

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

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
    if (token) {
      const status = checkToken();
      status ? history.push("/issues") : history.push("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={isAuth}>
      <StyledRootContainer>
        <Switch>
          <UserProvider>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route eact path="/issues" component={IssuesPage} />
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

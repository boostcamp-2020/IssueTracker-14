import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";

import myAxios from "./utils/myAxios";
import { AuthContext } from "./stores/auth";
import { UserProvider } from "./stores/user";
import { MilestoneProvider } from "./stores/milestone";
import { LabelProvider } from "./stores/label";
import { AssigneeProvider } from "./stores/assignee";
import { IssueProvider } from "./stores/issue";
import { QueryProvider } from "./stores/query";
import { CommentProvider } from "./stores/comment";

import LoginPage from "./pages/User/LoginPage";
import SignUpPage from "./pages/User/SignUpPage";
import IssuesPage from "./pages/Issue/IssuesPage";
import LabelPage from "./pages/Label/LabelPage";
import NewIssuePage from "./pages/Issue/NewIssuePage";
import EditIssuePage from "./pages/Issue/EditIssuePage";
import MilestonePage from "./pages/Milestone/MilestonePage";
import NewMilestonePage from "./pages/Milestone/NewMilestonePage";
import EditMilestonePage from "./pages/Milestone/EditMilestonePage";

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

  const [_, accessToken] = location.search.split("=");
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    location.href = "/";
  }

  const checkToken = async () => {
    const {
      data: { message, user },
    } = await myAxios.get("/user/status");
    if (message === "ok") {
      localStorage.setItem("userId", user.id);
      localStorage.setItem("nickname", user.nickname);
      localStorage.setItem("userImage", user.imageUrl);
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
            <IssueProvider>
              <AssigneeProvider>
                <LabelProvider>
                  <MilestoneProvider>
                    <QueryProvider>
                      <Route exact path="/" component={MilestonePage} />
                    </QueryProvider>
                    <Route exact path="/labels" component={LabelPage} />
                    <Route exact path="/milestones" component={MilestonePage} />
                    <Route
                      exact
                      path="/milestones/new"
                      component={NewMilestonePage}
                    />
                    <Route
                      path="/milestones/edit/:milestoneid"
                      component={EditMilestonePage}
                    />
                    <Route exact path="/issues/new" component={NewIssuePage} />
                    <CommentProvider>
                      <Route
                        exact
                        path="/issue/:issueId"
                        component={EditIssuePage}
                      />
                    </CommentProvider>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={SignUpPage} />
                  </MilestoneProvider>
                </LabelProvider>
              </AssigneeProvider>
            </IssueProvider>
          </UserProvider>
        </Switch>
        {/*
        <Route exact path="/issues/new" component={LoginForm} />
        <Route exact path="/issues/:issueid" component={LoginForm} />
        <Route exact path="/labels" component={LoginForm} />
      */}
      </StyledRootContainer>
    </AuthContext.Provider>
  );
};

export default App;

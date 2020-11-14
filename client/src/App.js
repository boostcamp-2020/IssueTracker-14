import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import myAxios from "@utils/myAxios";
import Styled from "./App.style";

import { AuthContext } from "@stores/auth/auth";
import { UserProvider } from "@stores/user/user";
import { MilestoneProvider } from "@stores/milestone/milestone";
import { LabelProvider } from "@stores/label/label";
import { AssigneeProvider } from "@stores/assignee/assignee";
import { IssueProvider } from "@stores/issue/issue";
import { QueryProvider } from "@stores/query/query";
import { CommentProvider } from "@stores/comment/comment";

import LoginPage from "@pages/User/LoginPage/LoginPage";
import SignUpPage from "@pages/User/SignUpPage/SignUpPage";
import IssuesPage from "@pages/Issue/IssuesPage/IssuesPage";
import LabelPage from "@pages/Label/LabelPage";
import NewIssuePage from "@pages/Issue/NewIssuePage/NewIssuePage";
import EditIssuePage from "@pages/Issue/EditIssuePage/EditIssuePage";
import MilestonePage from "@pages/Milestone/MilestonePage/MilestonePage";
import NewMilestonePage from "@pages/Milestone/NewMilestonePage/NewMilestonePage";
import EditMilestonePage from "@pages/Milestone/EditMilestonePage/EditMilestonePage";

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
      <Styled.RootContainer>
        <Switch>
          <UserProvider>
            <IssueProvider>
              <AssigneeProvider>
                <LabelProvider>
                  <MilestoneProvider>
                    <QueryProvider>
                      <Route exact path="/" component={IssuesPage} />
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
      </Styled.RootContainer>
    </AuthContext.Provider>
  );
};

export default App;

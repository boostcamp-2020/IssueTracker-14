import React, { useEffect } from "react";
import LoginForm from "./components/organisms/LoginForm";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

const StyledRootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const App = () => {
  // TODO: Router 설정 , checkLogin 후 분기
  //useEffect => checkLogin => flase history.push('/login') else history.push('/');
  return (
    <StyledRootContainer>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/login" component={LoginForm} />
      </Switch>
      {/*
        <Route exact path="/register" component={LoginForm} />
        <Route eact path="/issues" component={LoginForm} />s
        <Route exact path="/issues/new" component={LoginForm} />
        <Route exact path="/issues/:issueid" component={LoginForm} />
        <Route exact path="/labels" component={LoginForm} />
        <Route exact path="/milestones" component={LoginForm} />
        <Route path="/milestones/new" component={LoginForm} />
        <Route path="/milestones/edit/:milestoneid" component={LoginForm} />
      */}
    </StyledRootContainer>
  );
};

export default App;

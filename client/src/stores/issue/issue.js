import React, { useReducer, useContext, createContext } from "react";
import issueReducer from "./issue.reducer";
import initialState from "./issue.state";

const IssueStateContext = createContext();
const IssueDispatchContext = createContext();

const useIssueState = () => useContext(IssueStateContext);
const useIssueDispatch = () => useContext(IssueDispatchContext);

const IssueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issueReducer, initialState);
  return (
    <IssueStateContext.Provider value={state}>
      <IssueDispatchContext.Provider value={dispatch}>
        {children}
      </IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
};

export { IssueProvider, useIssueState, useIssueDispatch };

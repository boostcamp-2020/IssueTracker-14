import React, { useReducer, useContext, createContext } from "react";
import assigneeReducer from "./assignee.reducer";
import initialState from "./assignee.state";

const AssigneeStateContext = createContext();
const AssigneeDispatchContext = createContext();

const useAssigneeState = () => useContext(AssigneeStateContext);
const useAssigneeDispatch = () => useContext(AssigneeDispatchContext);

const AssigneeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assigneeReducer, initialState);
  return (
    <AssigneeStateContext.Provider value={state}>
      <AssigneeDispatchContext.Provider value={dispatch}>
        {children}
      </AssigneeDispatchContext.Provider>
    </AssigneeStateContext.Provider>
  );
};

export { AssigneeProvider, useAssigneeState, useAssigneeDispatch };

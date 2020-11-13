import React, { useReducer, useContext, createContext } from "react";

const initialState = {
  users: [],
};

const AssigneeReducer = (state, action) => {
  switch (action.type) {
    case "READ_LOADING":
      return {
        ...state,
        loading: false,
        error: null,
      };

    case "READ_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.data.users,
        error: null,
      };

    case "READ_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const AssigneeStateContext = createContext();
const AssigneeDispatchContext = createContext();

const useAssigneeState = () => useContext(AssigneeStateContext);
const useAssigneeDispatch = () => useContext(AssigneeDispatchContext);

const AssigneeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AssigneeReducer, initialState);
  return (
    <AssigneeStateContext.Provider value={state}>
      <AssigneeDispatchContext.Provider value={dispatch}>
        {children}
      </AssigneeDispatchContext.Provider>
    </AssigneeStateContext.Provider>
  );
};

export { AssigneeProvider, useAssigneeState, useAssigneeDispatch };

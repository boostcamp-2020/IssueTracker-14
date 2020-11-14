import React, { useReducer, useContext, createContext } from "react";
import queryReducer from "./query.reducer";
import initialState from "./query.state";

const QueryStateContext = createContext();
const QueryDispatchContext = createContext();

const useQueryState = () => useContext(QueryStateContext);
const useQueryDispatch = () => useContext(QueryDispatchContext);

const QueryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, initialState);
  return (
    <QueryStateContext.Provider value={state}>
      <QueryDispatchContext.Provider value={dispatch}>
        {children}
      </QueryDispatchContext.Provider>
    </QueryStateContext.Provider>
  );
};

export { QueryProvider, useQueryState, useQueryDispatch };

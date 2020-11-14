import React, { useReducer, useContext, createContext } from "react";
import userReducer from "./user.reducer";
import initialState from "./user.state";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const useUserState = () => useContext(UserStateContext);
const useUserDispatch = () => useContext(UserDispatchContext);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export { UserProvider, useUserState, useUserDispatch };

import React, { useReducer, useContext, createContext } from "react";
import myAxios from '../utils/myAxios';

const initialState = {
  inputs: {
    nickname: "",
    password: "",
  },
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "POST_USER":
      const body = {
        nickname: state.inputs.nickname,
        password: state.inputs.password,
      };
      const checkUserInfo = async () => {
        const { data: { message, token } } = await myAxios.post('/user/login', body);
        if (message === "success"){
          localStorage.setItem("token", token);
          location.href = "/";
        }
      }
      checkUserInfo();
    default:
      return state;
  }
}

const UserStateContext = createContext();
const UserDispatchContext = createContext();

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

const useUserState = () => useContext(UserStateContext);
const useUserDispatch = () => useContext(UserDispatchContext);

export { UserProvider, useUserState, useUserDispatch };
  
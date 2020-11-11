import React, { useReducer, useContext, createContext } from "react";
import myAxios from "../utils/myAxios";

const initialState = {
  login: {
    nickname: "",
    password: "",
  },
  signup: {
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  },
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LOGIN_INPUT":
      return {
        ...state,
        login: {
          ...state.login,
          [action.name]: action.value,
        },
      };

    case "CHANGE_SIGNUP_INPUT":
      return {
        ...state,
        signup: {
          ...state.signup,
          [action.name]: action.value,
        },
      };

    case "POST_USER":
      const checkLocalUserInfo = async () => {
        const {
          data: { message, token },
        } = await myAxios.post("/user/login", {
          nickname: state.login.nickname,
          password: state.login.password,
        });
        if (message === "success") {
          localStorage.setItem("token", token);
          location.href = "/";
        }
      };
      return checkLocalUserInfo();

    case "POST_SIGNUP_USER":
      const signUpNewUser = async () => {
        const {
          data: { message },
        } = await myAxios.post("/user/signup", {
          email: state.signup.email,
          nickname: state.signup.nickname,
          password: state.signup.password,
          passwordConfirm: state.signup.passwordConfirm,
        });
        if (message === "success") {
          location.href = "/";
          return;
        }
      };
      return signUpNewUser();

    default:
      return state;
  }
};

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

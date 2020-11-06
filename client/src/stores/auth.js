import { createContext, useContext } from "react";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext };

import React, { useReducer, useContext, createContext } from "react";
import labelReducer from "./label.reducer";
import initialState from "./label.state";

const LabelStateContext = createContext();
const LabelDispatchContext = createContext();

const useLabelState = () => useContext(LabelStateContext);
const useLabelDispatch = () => useContext(LabelDispatchContext);

const LabelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(labelReducer, initialState);
  return (
    <LabelStateContext.Provider value={state}>
      <LabelDispatchContext.Provider value={dispatch}>
        {children}
      </LabelDispatchContext.Provider>
    </LabelStateContext.Provider>
  );
};

export { LabelProvider, useLabelState, useLabelDispatch };

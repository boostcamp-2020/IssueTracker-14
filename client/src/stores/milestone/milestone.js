import React, { useReducer, useContext, createContext } from "react";
import milestoneReducer from "./milestone.reducer";
import initialState from "./milestone.state";

const MilestoneStateContext = createContext();
const MilestoneDispatchContext = createContext();

const useMilestoneState = () => useContext(MilestoneStateContext);
const useMilestoneDispatch = () => useContext(MilestoneDispatchContext);

const MilestoneProvider = ({ children }) => {
  const [state, dispatch] = useReducer(milestoneReducer, initialState);
  return (
    <MilestoneStateContext.Provider value={state}>
      <MilestoneDispatchContext.Provider value={dispatch}>
        {children}
      </MilestoneDispatchContext.Provider>
    </MilestoneStateContext.Provider>
  );
};

export { MilestoneProvider, useMilestoneState, useMilestoneDispatch };

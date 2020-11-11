import React, { useReducer, useContext, createContext } from "react";
import myAxios from "../utils/myAxios";

const initialState = {
  newMilestone: {
    title: "",
    duedate: "",
    description: "",
  },
  milestones: [],
  milestoneCount: {
    open: 0,
    closed: 0,
  },
  loading: true,
  error: null,
};

const milestoneReducer = (state, action) => {
  switch (action.type) {
    case "READ_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "READ_SUCCESS":
      return {
        ...state,
        loading: false,
        milestones: action.data.milestones,
        milestoneCount: action.data.milestoneCount,
        error: null,
      };

    case "READ_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "ON_CHANGE_INPUTS":
      return {
        ...state,
        newMilestone: {
          ...state.newMilestone,
          [action.name]: action.value,
        },
      };

    case "CREATE_NEW_MILESTONE":
      try {
        const createMilestone = async () => {
          const {
            data: { message },
          } = await myAxios.post("/milestone", {
            title: state.newMilestone.title,
            duedate: state?.newMilestone?.duedate,
            description: state?.newMilestone?.description,
          });
          if (message === "success") {
            alert("정상적으로 Milestone이 생성되었습니다.");
            return;
          }
        };
        return createMilestone();
      } catch (error) {
        console.log(error);
      }
      return;

    default:
      return state;
  }
};

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

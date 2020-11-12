import React, { useReducer, useContext, createContext } from "react";
import myAxios from "../utils/myAxios";

const initialState = {
  newMilestone: {
    title: "",
    duedate: null,
    description: null,
  },
  editMilestone: { title: "", duedate: null, description: null },
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

    case "ON_CHANGE_INPUTS_EDIT":
      return {
        ...state,
        editMilestone: {
          ...state.editMilestone,
          [action.name]: action.value,
        },
      };

    case "CREATE_NEW_MILESTONE":
      try {
        const createMilestone = async () => {
          const {
            data: { message },
          } = await myAxios.post("/milestone", {
            title: state.editMilestone.title,
            duedate: state?.editMilestone?.duedate,
            description: state?.editMilestone?.description,
          });
          if (message === "success") {
            alert("정상적으로 Milestone이 생성되었습니다.");
            return;
          }
        };
        createMilestone();
      } catch (error) {
        console.log(error);
      }
      return {
        ...state,
        newMilestone: {
          title: "",
          duedate: null,
          description: null,
        },
      };

    case "SET_INITIAL_EDITMILESTON": {
      return {
        ...state,
        editMilestone: {
          title: action.data.title,
          duedate: action.data.duedate,
          description: action.data.description,
        },
      };
    }

    case "EDIT_MILESTONE": {
      try {
        const updateMilestone = async () => {
          const {
            data: { message },
          } = await myAxios.put(`/milestone/${action.data}`, {
            title: state.editMilestone.title,
            duedate: state?.editMilestone?.duedate,
            description: state?.editMilestone?.description,
          });
          if (message === "success") {
            alert("정상적으로 Milestone이 수정되었습니다.");
          }
        };
        updateMilestone();
      } catch (error) {
        alert("에러발생");
        console.log(error);
      }
      return {
        ...state,
        editMilestone: { title: "", duedate: null, description: null },
      };
    }

    case "CLOSED_MILESTONE": {
      try {
        const deleteMilestone = async () => {
          const {
            data: { message },
          } = await myAxios.put(`/milestone/${action.data}`, {
            status: "closed",
          });
          if (message === "success") {
            alert("정상적으로 Milestone이 Close했습니다.");
          }
        };
        deleteMilestone();
      } catch (error) {
        alert("에러발생");
        console.log(error);
      }
      return {
        ...state,
      };
    }

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

import React, { useReducer, useContext, createContext } from "react";
import myAxios from "../utils/myAxios";

const initialState = {
  newLabel: {
    title: "",
    color: "",
    description: "",
  },
  labels: [],
  loading: true,
  error: null,
};

const LabelReducer = (state, action) => {
  switch (action.type) {
    case "READ_LOADING":
      return {
        ...state,
        loading: false,
        labels: null,
        error: null,
      };

    case "READ_SUCCESS":
      return {
        ...state,
        loading: false,
        labels: action.data.labels,
        error: null,
      };

    case "READ_ERROR":
      return {
        ...state,
        loading: false,
        labels: null,
        error: action.error,
      };

    case "ON_CHANGE_INPUTS":
      return {
        ...state,
        newLabel: {
          ...state.newLabel,
          [action.name]: action.value,
        },
      };

    case "CREATE_NEW_LABEL":
      try {
        const createLabel = async () => {
          const {
            data: { message },
          } = await myAxios.post("/label", {
            title: state.newLabel.title,
            duedate: state?.newLabel?.color,
            description: state?.newLabel?.description,
          });
          if (message === "success") {
            alert("정상적으로 Label이 생성되었습니다.");
            return;
          }
        };
        return createLabel();
      } catch (error) {
        console.log(error);
      }
      return;

    default:
      return state;
  }
};

const LabelStateContext = createContext();
const LabelDispatchContext = createContext();

const useLabelState = () => useContext(LabelStateContext);
const useLabelDispatch = () => useContext(LabelDispatchContext);

const LabelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LabelReducer, initialState);
  return (
    <LabelStateContext.Provider value={state}>
      <LabelDispatchContext.Provider value={dispatch}>
        {children}
      </LabelDispatchContext.Provider>
    </LabelStateContext.Provider>
  );
};

export { LabelProvider, useLabelState, useLabelDispatch };

import { faTruckMonster } from "@fortawesome/free-solid-svg-icons";
import React, { useReducer, useContext, createContext } from "react";

const initialState = {
  query: { status: "open", author: "", label: [], assignee: "", milestone: "" },
  isChanged: false,
};

const queryReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        query: { ...state.query, ...action.data },
        isChanged: true,
      };

    case "CHANGE_STATUS":
      return {
        ...state,
        query: { ...state.query, status: action.data },
        isChanged: true,
      };

    case "CHANGE_LABEL":
      if (state.query.label.includes(action.data)) {
        return {
          ...state,
          query: {
            ...state.query,
            label: state.query.label.filter((label) => label !== action.data),
          },
          isChanged: true,
        };
      } else {
        return {
          ...state,
          query: { ...state.query, label: [...state.query.label, action.data] },
          isChanged: true,
        };
      }
    case "CHANGE_AUTHOR":
      if (state.query.author === action.data) {
        return {
          ...state,
          query: { ...state.query, author: "" },
          isChanged: true,
        };
      } else {
        return {
          ...state,
          query: { ...state.query, author: action.data },
          isChanged: true,
        };
      }
    case "CHANGE_ASSIGNEE":
      if (state.query.assignee === action.data) {
        return {
          ...state,
          query: { ...state.query, assignee: "" },
          isChanged: true,
        };
      } else {
        return {
          ...state,
          query: { ...state.query, assignee: action.data },
          isChanged: true,
        };
      }
    case "CHANGE_MILESTONE":
      if (state.query.milestone === action.data) {
        return {
          ...state,
          query: { ...state.query, milestone: "" },
          isChanged: true,
        };
      } else {
        return {
          ...state,
          query: { ...state.query, milestone: action.data },
          isChanged: true,
        };
      }
    default:
      return state;
  }
};

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

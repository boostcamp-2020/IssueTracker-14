import React, { useReducer, useContext, createContext } from "react";

const initialState = {
  query: { status: "open", author: "", label: [], assignee: "", milestone: "" },
};

const queryReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        query: { ...state.query, ...action.data },
      };
    case "CHANGE_STATUS":
      return {
        query: { ...state.query, status: action.data },
      };
    case "CHANGE_LABEL":
      if (state.query.label.includes(action.data)) {
        return {
          query: {
            ...state.query,
            label: state.query.label.filter((label) => label !== action.data),
          },
        };
      } else {
        return {
          query: { ...state.query, label: [...state.query.label, action.data] },
        };
      }
    case "CHANGE_AUTHOR":
      if (state.query.author === action.data) {
        return {
          query: { ...state.query, author: "" },
        };
      } else {
        return {
          query: { ...state.query, author: action.data },
        };
      }
    case "CHANGE_ASSIGNEE":
      if (state.query.assignee === action.data) {
        return {
          query: { ...state.query, assignee: "" },
        };
      } else {
        return {
          query: { ...state.query, assignee: action.data },
        };
      }
    case "CHANGE_MILESTONE":
      if (state.query.milestone === action.data) {
        return {
          query: { ...state.query, milestone: "" },
        };
      } else {
        return {
          query: { ...state.query, milestone: action.data },
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

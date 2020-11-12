import React, { useReducer, useContext, createContext } from "react";

const initialState = {
  comments: [],
};

const commentReducer = (state, action) => {
  switch (action.type) {
    case "READ_LOADING":
      return {
        ...state,
        loading: false,
        error: null,
      };

    case "READ_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: action.data.comments,
        error: null,
      };

    case "READ_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const CommentStateContext = createContext();
const CommentDispatchContext = createContext();

const useCommentState = () => useContext(CommentStateContext);
const useCommentDispatch = () => useContext(CommentDispatchContext);

const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);
  return (
    <CommentStateContext.Provider value={state}>
      <CommentDispatchContext.Provider value={dispatch}>
        {children}
      </CommentDispatchContext.Provider>
    </CommentStateContext.Provider>
  );
};

export { CommentProvider, useCommentState, useCommentDispatch };

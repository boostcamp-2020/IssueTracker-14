import React, { useReducer, useContext, createContext } from "react";
import commentReducer from "./comment.reducer";
import initialState from "./comment.state";

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

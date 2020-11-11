import React, { useReducer, useContext, createContext } from "react";
import myAxios from "../utils/myAxios";

const initialState = {
  newIssue: {
    title: "",
    milestone: {},
    authorid: null,
    labelList: [],
    assigneeList: [],
    commentContent: null,
  },
  issues: [],
  issueCount: {
    open: 0,
    closed: 0,
  },
  loading: true,
  error: null,
};

// TODO: Sort dispatch로 하기
const issueReducer = (state, action) => {
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
        issues: action.data.issues,
        issueCount: action.data.issueCount,
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
        newIssue: {
          ...state.newIssue,
          [action.name]: action.value,
        },
      };

    // case "CREATE_NEW_ISSUE":
    //   try {
    //     const createIssue = async () => {
    //       const {
    //         data: { message },
    //       } = await myAxios.post("/issues", {
    //         title: state.newIssue.title,
    //         milestoneid: state.newIssue.milestoneid,
    //         labelIdList: state.newIssue.labelIdList,
    //         assigneeIdList: state.newIssue.assigneeIdList,
    //         commentContent: state.newIssue.commentContent,
    //       });
    //       if (message === "success") {
    //         alert("정상적으로 이슈가 생성되었습니다.");
    //         return;
    //       }
    //     };
    //     return createIssue();
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   return;

    case "SET_ASSIGNEES":
      return {
        ...state,
        newIssue: {
          ...state.newIssue,
          assigneeList: [...state.newIssue.assigneeList, action.data],
        },
      };

    case "SET_LABELS":
      return {
        ...state,
        newIssue: {
          ...state.newIssue,
          labelList: [...state.newIssue.labelList, action.data],
        },
      };

    case "SET_MILESTONE":
      return {
        ...state,
        newIssue: {
          ...state.newIssue,
          milestone: action.data,
        },
      };

    default:
      return state;
  }
};

const IssueStateContext = createContext();
const IssueDispatchContext = createContext();

const useIssueState = () => useContext(IssueStateContext);
const useIssueDispatch = () => useContext(IssueDispatchContext);

const IssueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issueReducer, initialState);
  return (
    <IssueStateContext.Provider value={state}>
      <IssueDispatchContext.Provider value={dispatch}>
        {children}
      </IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
};

export { IssueProvider, useIssueState, useIssueDispatch };

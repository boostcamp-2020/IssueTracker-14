import React, { useReducer, useContext, createContext } from "react";
import myAxios from "../utils/myAxios";

const initialState = {
  newIssue: {
    title: "",
    milestoneid: null,
    authorid: null,
    labelIdList: [],
    assigneeIdList: [],
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

    case "UPDATE_ISSUE_STATUS":
      try {
        const issueIdList = action.array;
        const updateIssueStatus = async () => {
          const {
            data: { message },
          } = await myAxios.put("/issues/changestatus", {
            issueIdList,
            status: action.status,
          });
          if (message === "success") {
            location.href = "/";
          }
        };
        updateIssueStatus();
        return { ...state };
      } catch (error) {
        console.log(error);
      }

    case "ON_CHANGE_INPUTS":
      return {
        ...state,
        newIssue: {
          ...state.newIssue,
          [action.name]: action.value,
        },
      };

    case "ADD_ASSIGNEE":
      if (state.newIssue.assigneeIdList.includes(action.data)) {
        return {
          ...state,
          newIssue: {
            ...state.newIssue,
            assigneeIdList: state.newIssue.assigneeIdList.filter(
              (el) => el !== action.data
            ),
          },
        };
      } else {
        return {
          ...state,
          newIssue: {
            ...state.newIssue,
            assigneeIdList: [...state.newIssue.assigneeIdList, action.data],
          },
        };
      }

    case "ADD_LABEL":
      if (state.newIssue.labelIdList.includes(action.data)) {
        return {
          ...state,
          newIssue: {
            ...state.newIssue,
            labelIdList: state.newIssue.labelIdList.filter(
              (el) => el !== action.data
            ),
          },
        };
      } else {
        return {
          ...state,
          newIssue: {
            ...state.newIssue,
            labelIdList: [...state.newIssue.labelIdList, action.data],
          },
        };
      }

    case "ADD_MILESTONE":
      if (state.newIssue.milestoneid === action.data) {
        return {
          ...state,
          newIssue: {
            ...state.newIssue,
            milestoneid: null,
          },
        };
      } else {
        return {
          ...state,
          newIssue: {
            ...state.newIssue,
            milestoneid: action.data,
          },
        };
      }

    case "CLEAR_OPTIONS":
      return {
        ...state,
        newIssue: {
          ...state.newIssue,
          assigneeIdList: [],
          labelIdList: [],
          milestoneid: null,
        },
      };

    case "CREATE_NEW_ISSUE":
      try {
        const createIssue = async () => {
          const {
            data: { message },
          } = await myAxios.post("/issues", {
            title: state.newIssue.title,
            milestoneid: state.newIssue.milestoneid,
            labelIdList: state.newIssue.labelIdList,
            assigneeIdList: state.newIssue.assigneeIdList,
            commentContent: state.newIssue.commentContent,
          });
          console.log(state.newIssue);
          if (message === "success") {
            alert("정상적으로 이슈가 생성되었습니다.");
            return state;
          }
        };
        createIssue();
        return state;
      } catch (error) {
        console.log(error);
      }

    case "EDIT_ISSUE":
      try {
        const editIssue = async () => {
          await myAxios.put(`/issues/${action.data.id}`, {
            title: action.data.title,
            status: action.data.status,
          });
        };
        editIssue();
        return state;
      } catch (error) {
        console.log(error);
      }

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

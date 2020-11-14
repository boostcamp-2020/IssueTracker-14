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

export default initialState;

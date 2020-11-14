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

export default initialState;

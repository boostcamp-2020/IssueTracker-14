const assigneeReducer = (state, action) => {
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
        users: action.data.users,
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

export default assigneeReducer;

import myAxios from "@utils/myAxios";

const labelReducer = (state, action) => {
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
        labels: action.data.labels,
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
          } = await myAxios.post("/label", action.body);
          if (message === "success") {
            alert("정상적으로 Label이 생성되었습니다.");
            return;
          }
        };
        createLabel();
      } catch (error) {
        console.log(error);
      }
      return state;

    case "UPDATE_LABEL":
      try {
        const updateLabel = async () => {
          const {
            data: { message },
          } = await myAxios.put(`/label/${action.labelId}`, action.body);
          if (message === "success") {
            alert("정상적으로 Label이 업데이트되었습니다.");
            return;
          }
        };
        updateLabel();
      } catch (error) {
        console.log(error);
      }
      return state;

    case "DELETE_LABEL":
      try {
        const deleteLabel = async () => {
          const {
            data: { message },
          } = await myAxios.delete(`/label/${action.labelId}`);
          if (message === "success") {
            alert("정상적으로 Label이 삭제되었습니다.");
            return;
          }
        };
        deleteLabel();
      } catch (error) {
        console.log(error);
      }
      return state;

    default:
      return state;
  }
};

export default labelReducer;

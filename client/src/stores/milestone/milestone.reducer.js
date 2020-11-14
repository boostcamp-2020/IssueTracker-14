import myAxios from "@utils/myAxios";

const milestoneReducer = (state, action) => {
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
        milestones: action.data.milestones,
        milestoneCount: action.data.milestoneCount,
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
        newMilestone: {
          ...state.newMilestone,
          [action.name]: action.value,
        },
      };

    case "ON_CHANGE_INPUTS_EDIT":
      return {
        ...state,
        editMilestone: {
          ...state.editMilestone,
          [action.name]: action.value,
        },
      };

    case "CREATE_NEW_MILESTONE":
      try {
        const createMilestone = async () => {
          const {
            data: { message },
          } = await myAxios.post("/milestone", {
            title: state.newMilestone.title,
            duedate: state?.newMilestone?.duedate,
            description: state?.newMilestone?.description,
          });
          if (message === "success") {
            alert("정상적으로 Milestone이 생성되었습니다.");
            return;
          }
        };
        createMilestone();
      } catch (error) {
        console.log(error);
      }
      return {
        ...state,
        newMilestone: {
          title: "",
          duedate: null,
          description: null,
        },
      };

    case "SET_INITIAL_EDITMILESTON": {
      return {
        ...state,
        editMilestone: {
          title: action.data.title,
          duedate: action.data.duedate,
          description: action.data.description,
        },
      };
    }

    case "EDIT_MILESTONE": {
      try {
        const updateMilestone = async () => {
          const {
            data: { message },
          } = await myAxios.put(`/milestone/${action.data}`, {
            title: state.editMilestone.title,
            duedate: state?.editMilestone?.duedate,
            description: state?.editMilestone?.description,
          });
          if (message === "success") {
            alert("정상적으로 Milestone이 수정되었습니다.");
          }
        };
        updateMilestone();
      } catch (error) {
        alert("에러발생");
        console.log(error);
      }
      return {
        ...state,
        editMilestone: { title: "", duedate: null, description: null },
      };
    }

    case "DELETE_MILESTONE": {
      try {
        const deleteMilestone = async () => {
          const {
            data: { message },
          } = await myAxios.delete(`/milestone/${action.data}`);
          if (message === "success") {
            alert("정상적으로 Milestone이 삭제했습니다.");
          }
        };
        deleteMilestone();
      } catch (error) {
        alert("에러발생");
        console.log(error);
      }
      return {
        ...state,
      };
    }

    case "CLOSED_MILESTONE": {
      try {
        const updateMilestoneClosed = async () => {
          const {
            data: { message },
          } = await myAxios.put(`/milestone/${action.data}`, {
            status: "closed",
          });
          if (message === "success") {
            alert("정상적으로 Milestone이 Close했습니다.");
          }
        };
        updateMilestoneClosed();
      } catch (error) {
        alert("에러발생");
        console.log(error);
      }
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default milestoneReducer;

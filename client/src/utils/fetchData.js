import myAxios from "@utils/myAxios";

const fetchTargetData = async (url, dispatch) => {
  dispatch({ type: "READ_LOADING" });
  try {
    const response = await myAxios.get(`/${url}`);
    dispatch({
      type: "READ_SUCCESS",
      data: response.data,
    });
  } catch (error) {
    dispatch({ type: "READ_ERROR", data: error });
  }
};

export default fetchTargetData;

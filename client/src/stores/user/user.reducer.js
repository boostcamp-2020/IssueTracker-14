import myAxios from "@utils/myAxios";

const userReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LOGIN_INPUT":
      return {
        ...state,
        login: {
          ...state.login,
          [action.name]: action.value,
        },
      };

    case "CHANGE_SIGNUP_INPUT":
      return {
        ...state,
        signup: {
          ...state.signup,
          [action.name]: action.value,
        },
      };

    case "POST_USER":
      try {
        const checkLocalUserInfo = async () => {
          const {
            data: { message, token },
          } = await myAxios.post("/user/login", {
            nickname: state.login.nickname,
            password: state.login.password,
          });
          if (message === "success") {
            localStorage.setItem("token", token);
            location.href = "/";
          }
        };
        checkLocalUserInfo();
      } catch (error) {
        console.log(error);
      }
      return state;

    case "POST_SIGNUP_USER":
      const signUpNewUser = async () => {
        const {
          data: { message },
        } = await myAxios.post("/user/signup", {
          email: state.signup.email,
          nickname: state.signup.nickname,
          password: state.signup.password,
          passwordConfirm: state.signup.passwordConfirm,
        });
        if (message === "success") {
          location.href = "/";
          return;
        }
      };
      return signUpNewUser();

    default:
      return state;
  }
};

export default userReducer;

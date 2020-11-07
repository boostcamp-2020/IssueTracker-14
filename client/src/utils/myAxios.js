import axios from "axios";

const serverURL =
  process.env.NODE_ENV === "development"
    ? process.env.SERVER_DOMAIN_DEVELOP
    : process.env.SERVER_DOMAIN_PRODUCTION;

const headerConfig = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const URL = `${serverURL}/api`;

const myAxios = {
  get: function (path) {
    return axios.get(URL + path, headerConfig);
  },

  post: function (path, data) {
    return axios.post(URL + path, data, headerConfig);
  },

  put: function (path, data) {
    return axios.put(URL + path, data, headerConfig);
  },

  delete: function (path) {
    return axios.put(URL + path, headerConfig);
  },
};

export default myAxios;

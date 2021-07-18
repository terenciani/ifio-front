import axios from "axios";
import config from "../config";
import Store from "./store";
const instance = axios.create({
  baseURL: config.apiHost,
});

instance
  .get("get-helpers")
  .then((res) => {
    Store.commit("apiHelper/setHelpers", res.data);
  })
  .catch(console.log);

const isAuthenticationError = (response) => {
  const errorCode = response?.data?.code;
  return Store.getters["apiHelper/userHelpers"].errosWithRequiresLogin.includes(
    errorCode
  );
};

instance.interceptors.response.use(
  (response) => {
    if (response.config) {
      response.config.meta.timeSpent =
        Date.now() - response.config.meta.startedAs;
    }
    return response;
  },
  (error) => {
    const { response } = error;

    if (isAuthenticationError(response)) Store.dispatch("logoffUser");

    return Promise.reject(error);
  }
);

instance.interceptors.request.use((req) => {
  req.meta = req.meta || {};
  req.meta.startedAs = Date.now();
  return req;
});

export default instance;

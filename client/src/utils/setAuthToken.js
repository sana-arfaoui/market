import { instance } from "../apis/api.instance";

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["access_token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete instance.defaults.headers.common["access_token"];
    localStorage.removeItem("token");
  }
};

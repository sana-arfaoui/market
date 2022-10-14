import {
  AUTH_ERROR,
  AUTH_CHECK,
  AUTH_LOADING,
  LOGIN,
  REGISTER,
  UPDATE_MY_INFO,
  LOGOUT,
  AUTH_MAIL_VERIFY,
} from "../Constants/action";
import { setAuthToken } from "../../utils/setAuthToken";
import { instance } from "../../apis/api.instance";

export const authCheck = () => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });

  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    const res = await instance.get("/api/auth/check");
    dispatch({
      type: AUTH_CHECK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};
export const emailVerify = (id, tokenMail) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });

  try {
    await instance.get(`/api/auth/${id}/verify/${tokenMail}`);
    dispatch({
      type: AUTH_MAIL_VERIFY,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};
export const login = (data) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
  try {
    const res = await instance.post("/api/auth/login", data, {
      headers: { "Content-Type": "application/json" },
    });

    setAuthToken(res.data.token);
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};
export const register = (queries, data) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
  /* This is to create a query string for the url. */
  let queryString = "?";
  for (const key in queries) {
    queryString += key + "=" + queries[key] + "&";
    //* ? limit =8
  }
  console.log("form product action  " + queryString);
  try {
    const res = await instance.post(`/api/auth/register${queryString}`, data, {
      header: { "Content-Type": "application/json" },
    });
    dispatch({
      type: REGISTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
  dispatch({
    type: LOGOUT,
  });
};

export const updateMyInfo = (data) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
  try {
    const res = await instance.put(`api/auth/updateInfo`, data, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({
      type: UPDATE_MY_INFO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};

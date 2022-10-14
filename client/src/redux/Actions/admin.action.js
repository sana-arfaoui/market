import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import {
  ADMIN_ERROR,
  ADMIN_CHECK,
  ADMIN_LOADING,
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
} from "../Constants/action";

export const authCheck = () => async (dispatch) => {
  dispatch({
    type: ADMIN_LOADING,
  });

  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    const res = await axios.get("/api/admin/check");
    dispatch({
      type: ADMIN_CHECK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: err,
    });
  }
};

export const login = (data) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOADING,
  });
  try {
    const res = await axios.post("/api/admin/login", data, {
      headers: { "Content-Type": "application/json" },
    });

 setAuthToken(res.data.token)
    dispatch({
      type: ADMIN_LOGIN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: err,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: ADMIN_LOADING,
  });
  dispatch({
    type: ADMIN_LOGOUT,
  });
};

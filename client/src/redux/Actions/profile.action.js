import { instance } from "../../apis/api.instance";
import {
  GET_MY_PROFILE,
  PROFILE_ERROR,
  PROFILE_LOADING,
  UPDATE_PROFILE,
} from "../Constants/action";

export const getMyProfile = () => async (dispatch) => {
  dispatch({
    type: PROFILE_LOADING,
  });
  try {
    const res = await instance.get("/api/Profile/");
    dispatch({
      type: GET_MY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

export const updateMyProfile = (data) => async (dispatch) => {
  dispatch({
    type: PROFILE_LOADING,
  });
  try {
    const res = await instance.put("/api/profile", data, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

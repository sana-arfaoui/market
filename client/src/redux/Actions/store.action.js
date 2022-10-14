import { instance } from "../../apis/api.instance";
import {
  GET_STORES,
  GET_STORE,
  STORE_ERROR,
  STORE_LOADING,
  UPDATE_PRODUCT,
  UPDATE_STORE,
  GET_MY_STORE,
} from "../Constants/action";

export const getStore = () => async (dispatch) => {
  dispatch({
    type: STORE_LOADING,
  });

  try {
    const res = await instance.get(`/api/store`);
    dispatch({
      type: GET_STORE,
      payload: res.data,
    });
  } catch (err) {
    localStorage.removeItem("store");
    //localStorage.removeItem("token");
    dispatch({
      type: STORE_ERROR,
      payload: err,
    });
  }
};
export const getMyStore = () => async (dispatch) => {
  dispatch({
    type: STORE_LOADING,
  });

  try {
    const res = await instance.get(`/api/store/me`);
    dispatch({
      type: GET_MY_STORE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STORE_ERROR,
      payload: err,
    });
  }
};
export const updateStore = (data) => async (dispatch) => {
  dispatch({
    type: STORE_LOADING,
  });

  try {
    const res = await instance.put(`/api/store/update`, data,{
      headers: { "Content-Type": "application/json" },
    });
    dispatch({
      type: UPDATE_STORE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STORE_ERROR,
      payload: err,
    });
  }
};

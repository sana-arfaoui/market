import { instance } from "../../apis/api.instance";
import {
  REVIEW_ERROR,
  REVIEW_LOADING,
  ADD_REVIEW,
  UPDATE_REVIEW,
} from "../Constants/action";
export const add_Review = (data, id) => async (dispatch) => {
  dispatch({
    type: REVIEW_LOADING,
  });
  try {
    const res = await instance.post(`/api/products/${id}/review`, data, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: err,
    });
  }
};

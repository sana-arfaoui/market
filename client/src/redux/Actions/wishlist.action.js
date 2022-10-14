import { instance } from "../../apis/api.instance";
import {
  WISHLIST_ERROR,
  WISHLIST_LOADING,
  ADD_ITEM_TO_WISHLIST,
  GET_MY_WISHLIST,
} from "../Constants/action";
export const addItemToWishlist = (id) => async (dispatch) => {
  try {
    const res = await instance.get(`/api/products/${id}/wishlist`);
    dispatch({
      type: ADD_ITEM_TO_WISHLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WISHLIST_ERROR,
      payload: err,
    });
  }
};

export const getMyWishlist = () => async (dispatch) => {
  dispatch({
    type: WISHLIST_LOADING,
  });
  try {
    const res = await instance.get(`/api/products/wishlist`);
    dispatch({
      type: GET_MY_WISHLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WISHLIST_ERROR,
      payload: err,
    });
  }
};

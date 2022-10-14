import { instance } from "../../apis/api.instance";
import {
  CATEGORY_ERROR,
  CATEGORY_LOADING,
  GET_CATEGORIES,
  ADD_CATEGORY,
  GET_CATEGORIES_BY_STORE,
} from "../Constants/action";

export const getCategories = (queries) => async (dispatch) => {
  dispatch({
    type: CATEGORY_LOADING,
  });
  /* This is to create a query string for the url. */
  let queryString = "?";
  for (const key in queries) {
    queryString += key + "=" + queries[key] + "&";
    //* ? limit =8
  }
  try {
    const res = await instance.get(`/api/products/me_categories${queryString}`);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err,
    });
  }
};

export const get_categories_By_store = (queries) => async (dispatch) => {
  dispatch({
    type: CATEGORY_LOADING,
  });
  /* This is to create a query string for the url. */
  let queryString = "?";
  for (const key in queries) {
    queryString += key + "=" + queries[key] + "&";
    //* ? limit =8
  }
  try {
    const res = await instance.get(
      `/api/products/get_categories_By_store${queryString}`
    );

    dispatch({
      type: GET_CATEGORIES_BY_STORE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err,
    });
  }
};
export const add_Categories = (data) => async (dispatch) => {
  dispatch({
    type: CATEGORY_LOADING,
  });

  try {
    const res = await instance.post(`/api/products/category`, data, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err,
    });
  }
};

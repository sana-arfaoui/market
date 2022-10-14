import { instance } from "../../apis/api.instance";

import {
  CHECKOUT_ORDER,
  ORDER_ERROR,
  ORDER_LOADING,
  EMPTY_CART,
  GET_ORDER,
  GET_ORDERS,
  GET_ORDERS_MERCHANT,
  GET_MY_ORDER,
  GET_MY_ORDERS,
  CANCELED_ORDER,
  CONFIRMED_ORDER,
  FULFILLED_ORDER,
  GET_ORDER_MERCHANT,
} from "../Constants/action";
export const checkoutOrder = () => async (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });

  try {
    const res = await instance.get("/api/orders/checkout");
    dispatch({
      type: CHECKOUT_ORDER,
      payload: res.data,
    });
    dispatch({
      type: EMPTY_CART,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};

export const getMyOrder = (id) => async (dispatch) => {
  try {
    const res = await instance.get(`/api/orders/getMYOrder/${id}`);
    dispatch({
      type: GET_MY_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};
export const merchantOrder = (id) => async (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });

  try {
    const res = await instance.get(`/api/orders/merchantOrder/${id}`);
    dispatch({
      type: GET_ORDER_MERCHANT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};
export const MyOrders = () => async (dispatch) => {
  try {
    const res = await instance.get(`/api/orders/me`);
    dispatch({
      type: GET_MY_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};
export const merchantOrders = (queries) => async (dispatch) => {
  // dispatch({
  //   type: ORDER_LOADING,
  // });
  let queryString = "?";
  for (const key in queries) {
    queryString += key + "=" + queries[key] + "&";
  }

  try {
    const res = await instance.get(`/api/orders/merchantOrders${queryString}`);
    dispatch({
      type: GET_ORDERS_MERCHANT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};

export const canceledOrder = (id) => async (dispatch) => {
  try {
    const res = await instance.get(`/api/orders/canceled/${id}`);
    dispatch({
      type: CANCELED_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};
export const confirmedOrder = (id) => async (dispatch) => {
  try {
    const res = await instance.get(`/api/orders/confirmed/${id}`);
    dispatch({
      type: CONFIRMED_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};

export const fulfilledOrder = (id) => async (dispatch) => {
  try {
    const res = await instance.get(`/api/orders/fulfilled/${id}`);
    dispatch({
      type: FULFILLED_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};

// export const getOrder = (id) => async (dispatch) => {
// 	try {
// 	  const res = await instance.get(`/api/orders/${id}`);
// 	  dispatch({
// 		type: GET_ORDER,
// 		payload: res.data,
// 	  });
// 	} catch (err) {
// 	  dispatch({
// 		type: ORDER_ERROR,
// 		payload: err,
// 	  });
// 	}
//   };
//   export const getOrders = () => async (dispatch) => {
// 	try {
// 	  const res = await instance.get(`/api/orders`);
// 	  dispatch({
// 		type: GET_ORDERS,
// 		payload: res.data,
// 	  });
// 	} catch (err) {
// 	  dispatch({
// 		type: ORDER_ERROR,
// 		payload: err,
// 	  });
// 	}
//   };

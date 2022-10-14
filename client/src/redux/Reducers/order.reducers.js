import {
  CHECKOUT_ORDER,
  ORDER_ERROR,
  ORDER_LOADING,
  GET_ORDER,
  GET_ORDERS,
  GET_ORDERS_MERCHANT,
  GET_MY_ORDER,
  GET_ORDER_MERCHANT,
  GET_MY_ORDERS,
  CANCELED_ORDER,
  CONFIRMED_ORDER,
  FULFILLED_ORDER,
} from "../Constants/action";
const initialState = {
  items: [],
  orders: [],
  order: null,

  message: "",
  isLoading: false,
  error: {},
};

const orderReducers = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ORDER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CHECKOUT_ORDER:
      return {
        ...state,
        order: payload,
        isLoading: false,
      };
    case GET_MY_ORDER:
      return {
        ...state,
        order: payload,
        isLoading: false,
      };
    case GET_ORDER_MERCHANT:
      return {
        ...state,
        order: payload,
        isLoading: false,
      };
    case GET_MY_ORDERS:
      return {
        ...state,
        orders: payload,
        isLoading: false,
      };
    case GET_ORDERS_MERCHANT:
      return {
        ...state,
        orders: payload,
        isLoading: false,
      };
    case CANCELED_ORDER:
      return {
        ...state,
        message: payload,
        isLoading: false,
      };
    case CONFIRMED_ORDER:
      return {
        ...state,
        message: payload,
        isLoading: false,
      };
    case FULFILLED_ORDER:
      return {
        ...state,
        message: payload,
        isLoading: false,
      };
    case ORDER_ERROR:
      return {
        isLoading: false,
        orders: [],
        order: null,
        error: payload,
      };

    default:
      return state;
  }
};
export default orderReducers;

import {
  ADD_TO_CART,
  CART_ERROR,
  REMOVE_FROM_CART,
  EMPTY_CART,
  GET_OWNED_CART,
  CART_LOADING,
  GET_MY_CARTS,
  GET_MY_CUSTOMER,
} from "../Constants/action";
const initialState = {
  items: [],
  carts: [],
  totalPrice: 0,
  totalPriceWithTax: 0,
  taxPercentage: 0,
  isLoading: false,
  error: {},
};
const CartReducers = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_OWNED_CART:
      return {
        ...state,
        ...payload,

        isLoading: false,
      };
    case GET_MY_CARTS:
      return {
        ...state,
        carts: payload,
        isLoading: false,
      };
    case GET_MY_CUSTOMER:
      return {
        ...state,
        carts: payload,
        isLoading: false,
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: payload.items,
        isLoading: false,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.product._id !== payload),
        isLoading: false,
      };
    case EMPTY_CART:
      return {
        ...state,
        items: [],
        totalPrice: 0,
        totalPriceWithTax: 0,
        isLoading: false,
      };
    case CART_ERROR:
      return {
        items: [],
        totalPrice: 0,
        totalPriceWithTax: 0,
        taxPercentage: 0,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
export default CartReducers;

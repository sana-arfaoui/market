import {
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  PRODUCT_LOADING,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../Constants/action";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: {},
};
const ProductReducers = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        isLoading: false,
      };

    case ADD_PRODUCT:
      // let allProducts = state.products;
      // allProducts.unshift(payload);
      return {
        ...state,
        //products: [...allProducts],
        product: payload,
        isLoading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((P) => P._id !==payload),
        product: payload,
        isLoading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: payload,
        isLoading: false,
      };
    case PRODUCT_ERROR:
      return {
        isLoading: false,
        products: [],
        product: null,
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
export default ProductReducers;

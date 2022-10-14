import {
  GET_STORES,
  GET_STORE,
  STORE_ERROR,
  STORE_LOADING,
  UPDATE_STORE,
  GET_MY_STORE,
} from "../Constants/action";

const initialState = {
  stores: [],
  store: null,
  isLoading: false,
  error: {},
};

const StoreReducers = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case STORE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_STORES:
      return {
        ...state,
        stores: payload,
        isLoading: false,
      };
    case GET_STORE:
      return {
        ...state,
        store: payload,
        isLoading: false,
      };
    case GET_MY_STORE:
      return {
        ...state,
        store: payload,
        isLoading: false,
      };
    case UPDATE_STORE:
      return {
        ...state,
        store: payload,
        isLoading: false,
      };

    case STORE_ERROR:
      return {
        ...state,
        isLoading: false,
        stores: [],
        store: null,
        error: payload,
      };

    default:
      return state;
  }
};
export default StoreReducers;

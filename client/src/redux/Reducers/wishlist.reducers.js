import {
  WISHLIST_ERROR,
  WISHLIST_LOADING,
  ADD_ITEM_TO_WISHLIST,
  GET_MY_WISHLIST,
} from "../Constants/action";
const initialState = {
  wishlist: [],
  wishlist_item: null,
  isLoading: false,
  error: {},
};
const WishlistReducers = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case WISHLIST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_ITEM_TO_WISHLIST:
      let allProducts = state.wishlist_item;
      allProducts.shift(payload);
      return {
        ...state,
        wishlist:[...allProducts],
        wishlist_item: payload,
        isLoading: false,
      };
    case GET_MY_WISHLIST:
      return {
        ...state,

        wishlist: payload,
        isLoading: false,
      };

    case WISHLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        wishlist: [],
        wishlist_item: null,

        error: payload,
      };

    default:
      return state;
  }
};
export default WishlistReducers;

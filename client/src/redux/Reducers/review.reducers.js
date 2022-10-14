import {
  REVIEW_ERROR,
  REVIEW_LOADING,
  ADD_REVIEW,
  UPDATE_REVIEW,
} from "../Constants/action";
const initialState = {
  reviews: [],
  review: null,
  isLoading: false,
  error: {},
};
const ProductReducers = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case REVIEW_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_REVIEW:
      let AllReviews = state.reviews;
      AllReviews.unshift(payload);
      return {
        ...state,
        reviews: [...AllReviews],
        review: payload,
        isLoading: false,
      };

    case REVIEW_ERROR:
      return {
        isLoading: false,
        reviews: [],
        review: null,
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
export default ProductReducers;

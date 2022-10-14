import { GET_ADDRESS, UPDATE_ADDRESS } from "../Constants/action";

const initialState = {
  addresses: [],
  address: null,
  isLoading: false,
  error: {},
};

const AddressReducers = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default AddressReducers;

import {
  ADMIN_CHECK,
  ADMIN_ERROR,
  ADMIN_LOADING,
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
} from "../Constants/action";

const initialState = {
  token: localStorage.getItem("token"),
  admin: null,
  error: {},
  isLoading: false,
  isAuthenticated: false,
};
const AdminReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_LOADING:
      return {
        ...state,
        admin: payload,
        isLoading: true,
      };
    case ADMIN_LOGIN:
      return {
        ...state,
        admin: payload.admin,
        token: payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case ADMIN_CHECK:
      return {
        ...state,
        admin: payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case ADMIN_ERROR:
      localStorage.removeItem("token");
      return {
        admin: null,
        token: null,
        isAuthenticated: false,
        error: payload,
        isLoading: false,
      };
    case ADMIN_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        token: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
export default AdminReducers;

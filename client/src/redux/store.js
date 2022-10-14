import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk"; //meddillware  redux
import rootReducer from "../redux/Reducers";

const initialSate = {};
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialSate,
  composeWithDevTools(applyMiddleware(...middleware))
);

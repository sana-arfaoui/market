import { combineReducers } from "redux";
import adminReducers from "./admin.reducers";
import authReducers from "./auth.reducers";
import productReducers from "./product.reducers";
import categoryReducers from "./category.reducers";
import storeReducers from "./store.reducers";
import cartReducers from "./cart.reducers";
import orderReducers from "./order.reducers";
import addressReducers from "./address.reducers";
import profileReducers from "./profile.reducers";
import wishlistReducers from "./wishlist.reducers";
export default combineReducers({
  adminReducers,
  authReducers,
  productReducers,
  categoryReducers,
  storeReducers,
  cartReducers,
  orderReducers,
  addressReducers,
  profileReducers,
  wishlistReducers,
});

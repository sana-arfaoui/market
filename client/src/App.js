import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { setAuthToken } from "./utils/setAuthToken";
import { authCheck, logout } from "./redux/Actions/auth.action";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./guards/PrivateRoutes";
import Landing from "./pages/Landing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Search from "./pages/search";
import Profile from "./pages/profile";
import PersonnelInformation from "./shared/PersonnelInformation";
import AddProduct from "./pages/Dashboard/components/AddProduct";
import Product from "./pages/Dashboard/components/Products";
import Customer from "./pages/Dashboard/components/Customer";
import Order from "./pages/Dashboard/components/Order";
import Category from "./pages/Dashboard/components/Category";
import Orders from "./pages/profile/components/Orders";
import Wishlist from "./pages/profile/components/Wishlist";
import Address from "./pages/profile/components/Address";
import Carts from "./pages/profile/components/Carts";
import RequiredAuth from "./routes/RequiredAuth";
import EmailVerify from "./pages/EmailVerify";
import Summary from "./pages/Dashboard/components/Summary";
import Authentication from "./pages/Authentication";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import NotFound from "./shared/NotFound";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(authCheck());

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  }, []);
  // const match = useMatch("/home/:storeId");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className=" w-full font-PtSans">
          {/* {match && <Header />} */}
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/authentication" element={<Authentication />}>
              <Route path="" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
            </Route>

            <Route
              path="/user/:id/verify/:tokenMail"
              element={<EmailVerify />}
            ></Route>

            <Route path="/home/:storeId" element={<Home />}></Route>
            <Route path="search" element={<Search />} />
            <Route path="/details/:slug" element={<ProductDetails />} />
            <Route path="*" elem ent={<NotFound />}></Route>

            <Route path="/" element={<RequiredAuth />}>
              <Route path="cart" element={<Cart />} />
              <Route path="profile" element={<Profile />}>
                <Route path="" element={<PersonnelInformation />}></Route>
                <Route path="orders" element={<Orders />}></Route>
                <Route path="wishlist" element={<Wishlist />}></Route>
                <Route path="address" element={<Address />}></Route>
                <Route path="carts" element={<Carts />}></Route>
              </Route>

              <Route
                path="dashboard"
                element={
                  <PrivateRoutes>
                    <Dashboard />
                  </PrivateRoutes>
                }
              >
                <Route path="" element={<Summary />}></Route>
                <Route path="product" element={<Product />}></Route>
                <Route path="customer" element={<Customer />}></Route>
                <Route path="order" element={<Order />}></Route>
                <Route path="category" element={<Category />}></Route>
                <Route
                  path="addProduct"
                  element={
                    <PrivateRoutes>
                      <AddProduct />
                    </PrivateRoutes>
                  }
                ></Route>
                <Route
                  path="my_info"
                  element={<PersonnelInformation />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

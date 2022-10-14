import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import YouMayAlsoLike from "../../shared/YouMayAlsoLike";
import Spinner from "../../shared/Spinner";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import { Navigate } from "react-router-dom";
import { emptyCart, removeFromCart } from "../../redux/Actions/cart.action";
import { checkoutOrder } from "../../redux/Actions/order.action";
import { updateMyAddress } from "../../redux/Actions/address.action";
import { getOwnedCart } from "../../redux/Actions/cart.action";
import styled from "styled-components"
const Cart = () => {
  const { isAuthenticated, user } = useSelector((state) => {
    return state.authReducers;
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOwnedCart());
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  const [Address, setAddress] = useState({
    street: user?.address?.street,
    city: user?.address?.city,
    zipCode: user?.address?.zipCode,
    country: user?.address?.country,
  });
  const onInputChange = (e) => {
    e.preventDefault();
    setAddress({ ...Address, [e.target.name]: e.target.value });
  };
  const onSubmitAddress = (e) => {
    e.preventDefault();
    dispatch(updateMyAddress(Address));

    setAddress({
      ...Address,
      street: user?.address?.street,
      city: user?.address?.city,
      zipCode: user?.address?.zipCode,
      country: user?.address?.country,
    });
  };

  const { items, isLoading, totalPrice, totalPriceWithTax, taxPercentage } =
    useSelector((state) => state.cartReducers);

  const empty = (e) => {
    e.preventDefault();
    dispatch(emptyCart());
  };
  const checkout = (e) => {
    e.preventDefault();
    dispatch(checkoutOrder());
  };
  const [quantity, setQuantity] = useState(0);
  if (!isAuthenticated) {
    return <Navigate to={`/home/${localStorage.store}`} />;
  }

  return (
    <div className="font-Roboto">
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="pb-5 xl:pt-10  px-9 w-full">
          <div className="flex justify-between">
            <div className="text-2xl font-bold"> Cart </div>
            <button className="bg-white hover:bg-gray-100  font-semibold py-2 px-4 border-gray-400 rounded shadow">
              Order
            </button>
          </div>
          <div className="text-gray">Home/Search/Category/product</div>
          {/* ------- */}
          <div className="flex xl:flex-wrap gap-20 items-start justify-center mx-auto  pt-10 w-full">
            {/* ------- */}
            <div className="w-2/3 xl:w-[60rem] ">
              <div className="w-full">
                <div className="flex m items-center justify-around  w-full">
                  <div>Product</div>
                  <div> Price</div>
                  <div> Quantity</div>
                  <div> Total </div>
                </div>
                {/* -----order---- */}
                {items?.length > 0 &&
                  items.map((product) => (
                    <div
                      key={product.product?._id}
                      className=" mb-5  bg-white   h-20  shadow-md rounded-md grid  grid-flow-col	items-center justify-between w-full"
                    >
                      <Link
                        to={`/details/${product.product?.slug}`}
                        className="flex h-full gap-3 items-center"
                      >
                        <img
                          className="w-32  h-16 object-contain rounded-md"
                          src={product.product?.image}
                          alt="productImg"
                        />
                        <div className=" flex flex-col">
                          <div> {product.product?.title} </div>
                          <div className="w-32">
                            Ref: {product.product?.reference}
                          </div>
                        </div>
                      </Link>
                      <div> {product.price} TND</div>
                      <div className="flex  items-center gap-2">
                        <button
                          onClick={() => setQuantity((Q) => Q - 1)}
                          className="rounded-full w-5 h-5  bg-Warning flex justify-center items-center"
                        >
                          <i className=" text-white fa-solid fa-minus"></i>
                        </button>
                        <div className=" px-7 sm:px-0 shadow-md">
                          {" "}
                          {product.quantity + quantity}
                        </div>
                        <button
                          onClick={() => setQuantity((Q) => Q + 1)}
                          className="rounded-full w-5 h-5  bg-Success flex justify-center items-center"
                        >
                          <i className="fa-solid fa-plus text-white"></i>
                        </button>
                      </div>
                      <div>{product.total} TND</div>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(removeFromCart(product.product._id))
                        }
                        className="  hover:text-white text-danger bg-white hover:bg-danger   focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                      >
                        {" "}
                        <i className="fa-solid fa-trash "></i>
                      </button>
                    </div>
                  ))}

                {/* -----order---- */}
              </div>
              <div className="flex justify-between items-baseline pt-5">
                <div>
                  <div>
                    tax :
                    <span className="text-xl font-bold">
                      {" "}
                      {taxPercentage} %
                    </span>
                  </div>
                  <div>
                    Total Price :
                    <span className="text-xl font-bold"> {totalPrice} TND</span>
                  </div>
                  <div>
                    Total Price with Tax :
                    <span className="text-xl font-bold">
                      {" "}
                      {totalPriceWithTax} TND
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => empty(e)}
                  type="button"
                  className="px-5 py-2 text-sm font-medium text-info  bg-white hover:bg-info hover:text-white rounded-md"
                >
                  Empty cart <i className="fa-solid fa-trash text-danger"></i>
                </button>
              </div>
              {isAuthenticated ? (
                <button
                  type="submit"
                  onClick={(e) => {
                    checkout(e);
                  }}
                  className="bg-info sm:hidden  mb-2 flex mx-auto	 text-white font-bold py-3 px-10 rounded-md text-xs  hover:bg-white hover:text-info"
                >
                  Checkout
                </button>
              ) : (
                ""
              )}
            </div>
            {/* --------------------------------------------- */}
            <div className="w-1/3 xl:w-[80%] sm:w-full p-10 bg-white rounded-lg">
              <div className="flex justify-center text-3xl">Command form</div>
              {isAuthenticated ? (
                <div className="w-full">
                  {/* --------------------------------------------- */}

                  <div className=" pt-5 w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 pb-2"
                      htmlFor="name"
                    >
                      Name : {user?.firstName}
                    </label>
                  </div>
                  <div className=" w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 pb-2"
                      htmlFor="lastName"
                    >
                      last Name :{user?.lastName}
                    </label>
                  </div>

                  <div className=" w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 pb-2"
                      htmlFor="phone"
                    >
                      phone :{user?.number}
                    </label>
                  </div>
                  <div className="pb-5 w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 pb-2"
                      htmlFor="email"
                    >
                      email : {user?.email}
                    </label>
                  </div>
                  <Link
                    to="/profile/"
                    type="button"
                    className="bg-info  mb-2 flex mx-auto	hover:bg-Primary text-white font-bold py-3 px-10 rounded-md text-xs max-w-max"
                  >
                    Update Info
                  </Link>
                  <form
                    onSubmit={(e) => onSubmitAddress(e)}
                    className=" pl-2 pt-3 w-full"
                  >
                    <div className="pb-5 w-full relative">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 pb-2"
                        htmlFor="address"
                      >
                        Address : <span className="text-Danger">*</span>
                      </label>
                      <div className="relative  pl-5 pb-5 ">
                        <input
                          className=" outline-none focus:border-Primary pl-5 border-r-0   border-2 border-gray rounded-l-full h-[3rem]  sm:h-5  w-1/2 "
                          onChange={(e) => onInputChange(e)}
                          value={Address.country}
                          type="text"
                          name="country"
                          id="country"
                          placeholder="country"
                          required
                        />
                        <input
                          className=" outline-none focus:border-Primary border-l-0  border-2 border-gray rounded-r-full h-[3rem]  sm:h-5  w-1/2 "
                          onChange={(e) => onInputChange(e)}
                          value={Address.city}
                          type="text"
                          name="city"
                          id="city"
                          placeholder="city"
                          required
                        />
                        <i className="absolute text-2xl sm:text-sm text-Primary fa-solid fa-earth-africa right-5 top-[calc(50%-25px)]" />
                      </div>
                      <div className="relative   pl-5  ">
                        <input
                          className=" outline-none focus:border-Primary pl-5 border-r-0   border-2 border-gray rounded-l-full h-[3rem]  sm:h-5  w-1/2 "
                          onChange={(e) => onInputChange(e)}
                          value={Address.street}
                          type="text"
                          name="street"
                          id="street"
                          placeholder="street"
                          required
                        />
                        <input
                          className=" outline-none focus:border-Primary border-l-0  border-2 border-gray rounded-r-full h-[3rem]  sm:h-5  w-1/2 "
                          onChange={(e) => onInputChange(e)}
                          value={Address.zipCode}
                          type="number"
                          name="zipCode"
                          id="zipCode"
                          placeholder="zipCode"
                          required
                        />
                        <i className="absolute text-2xl sm:text-sm text-Primary fa-solid fa-lock right-5 top-[calc(50%-15px)]" />
                      </div>
                    </div>

                    {/* --------------------------------------------- */}

                    <button
                      type="submit"
                      className="bg-info  mb-2 flex mx-auto	hover:bg-Primary text-white font-bold py-3 px-10 rounded-md text-xs"
                    >
                      Update Address
                    </button>
                  </form>
                </div>
              ) : (
                <div>connect to manager your cart</div>
              )}
            </div>
            {isAuthenticated ? (
              <button
                type="submit"
                onClick={(e) => {
                  checkout(e);
                }}
                className="bg-info  hidden mb-2 sm:flex mx-auto	 text-white font-bold py-3 px-10 rounded-md text-xs  hover:bg-white hover:text-info"
              >
                Checkout
              </button>
            ) : (
              ""
            )}

            {/* ------- */}
          </div>
          {/* ------- */}
          <div className="mt-5">
            <Link
              to={`/home/${localStorage.store}`}
              className="bg-white  hover:bg-gray-100 font-semibold py-2 px-4 border-gray-400 rounded shadow"
            >
              <i className="fas fa-undo pr-2"></i>
              Continue shopping
            </Link>
          </div>
          <div className="w-max mx-auto text-xl font-semibold py-10 ">
            YOU MAY ALSO LIKE
          </div>

          {/* <YouMayAlsoLike /> */}
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Cart;

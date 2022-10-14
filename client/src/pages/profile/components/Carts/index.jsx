import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyCarts } from "../../../../redux/Actions/cart.action";

import Spinner from "../../../../shared/Spinner";
const Carts = () => {
  const { isAuthenticated, user } = useSelector((state) => {
    return state.authReducers;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyCarts());
  }, [isAuthenticated]);

  const { carts, isLoading } = useSelector((state) => state.cartReducers);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <div className=" flex justify-between pt-5 px-5 sm:flex-col text-3xl md:text-2xl">
        <h1 className=" "> My Carts </h1>
        <h1 className=" "> number of carts :{carts?.length}</h1>
      </div>
      <div className=" font-Roboto  mx-auto w-[90%]  px-10 py-10 rounded-lg grid grid-cols-5">
        {carts?.carts?.length > 0 &&
          carts.carts?.map((cart) => {
            return (
              <Link
                to={`/home/${cart.store?._id}`}
                key={cart._id}
                className=" flex flex-col items-center transition hover:border ease-in-out duration-500 hover:rounded-lg hover:scale-110 bg-white  h-max"
              >
                <div className=" w-14 h-14 sm:w-10 sm:h-10">
                  <img
                    className=" rounded-full object-cover  w-full h-full"
                    src={cart.store.logo}
                    alt={cart?.store.title}
                  />
                </div>
                <p className="h-1/2"> {cart?.store?.title} </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Carts;

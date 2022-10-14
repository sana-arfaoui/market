import React from "react";
import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import { Link } from "react-router-dom";

import { Outlet } from "react-router-dom";
const Profile = () => {
  return (
    <div className="font-Roboto">
      <Header />

      <div className="pt-20 w-full  mx-auto ">
        <h1 className="mx-auto w-max text-2xl font-semibold ">My account </h1>
        <article className="w-[85%] flex flex-row m-auto  justify-start items-start  gap-4 py-9">
          <aside className=" bg-white w-1/5  rounded-lg flex flex-col justify-around h-full  ">
            <Link
              to="/profile/"
              className="    hover:bg-info   rounded-lg  hover:text-white flex flex-col gap-2 items-center justify-center h-1/5 py-7  py-7"
            >
              <i className="    transition  ease-in-out duration-3000  hover:scale-110 text-5xl sm:text-xl fa-solid fa-user"></i>
              <h3 className="sm:truncate sm:w-0 sm:h-0">
                personnel information
              </h3>
            </Link>
            <Link
              to="/profile/orders"
              className="    hover:bg-info   rounded-lg  hover:text-white flex flex-col gap-2 items-center w-full justify-center  h-1/5 py-7  px-5"
            >
              <i className="    transition  ease-in-out duration-3000  hover:scale-110 text-5xl sm:text-xl fa-solid fa-arrow-down-short-wide"></i>
              <h3 className="sm:truncate sm:w-0 sm:h-0">my orders</h3>
            </Link>
            <Link
              to="/profile/wishlist"
              className="    hover:bg-info   rounded-lg  hover:text-danger flex flex-col gap-2 items-center justify-center h-1/5 py-7 px-5"
            >
              <i className="    transition  ease-in-out duration-3000  hover:scale-110  text-5xl sm:text-xl fa-solid fa-heart-circle-check"></i>
              <h3 className="sm:truncate sm:w-0 sm:h-0 ">my Wishlist</h3>
            </Link>
            <Link
              to="/profile/address"
              className="    hover:bg-info   rounded-lg  hover:text-white flex flex-col gap-2 items-center justify-center h-1/5 py-7 px-5"
            >
              <i className="    transition  ease-in-out duration-3000  hover:scale-110 text-5xl sm:text-xl fa-solid fa-location-dot"></i>
              <h3 className="sm:truncate sm:w-0 sm:h-0">my address</h3>
            </Link>
            <Link
              to="/profile/carts"
              className="  hover:bg-info   rounded-lg  hover:text-white  flex flex-col gap-2 items-center justify-center h-1/5 py-7 px-5"
            >
              <i className="    transition  ease-in-out duration-3000  hover:scale-110 text-5xl sm:text-xl  fa-solid fa-cart-arrow-down"></i>
              <h3 className="sm:truncate sm:w-0 sm:h-0 ">my carts</h3>
            </Link>
          </aside>
          <section className="w-4/5  rounded-lg   flex flex-col bg-white   min-h-screen">
            <Outlet />
          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

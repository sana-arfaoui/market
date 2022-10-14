import React from "react";
import { Outlet } from "react-router-dom";
import homeImg from "../../assets/image/homeimg.png";
import logo from "../../assets/logo/logoDukkan.svg";
import { Link, NavLink } from "react-router-dom";

const Authentication = () => {
  return (
    <section className="w-full font-Roboto 	">
      <Link to="/" >
        <img
          className="max-w-[13rem] sm:w-1/2 sm:mx-auto mt-5 ml-5"
          src={logo}
          alt="dukkan"
        />
      </Link>
      <div className="flex flex-row w-[95%] md:flex-col items-start md:items-center justify-center mx-auto">
        <div className="w-1/2 flex flex-col justify-center	items-center gap-5 pt-16">
          <div className="flex flex-row justify-center	items-center sm:flex-auto pb-12 text-5xl md:text-3xl sm:text-2xl">
            <NavLink
              to="/authentication/"
              className={({ isActive }) =>
                isActive ? "text-Primary" : "text-gray"
              }
            >
              <hr
                className={({ isActive }) =>
                  isActive
                    ? "border-0 bg-Primary text-gray-500 h-[2px]"
                    : "border-0 bg-gray text-gray-500 h-[2px]"
                }
              />
              <p className=" pr-5 ">Sign in</p>
            </NavLink>
            <NavLink
              to="/authentication/register"
              className={({ isActive }) =>
                isActive ? "text-Primary" : "text-gray"
              }
            >
              <hr
                className={({ isActive }) =>
                  isActive ? " bg-Primary   h-40 " : "border-0 bg-gray  h-40"
                }
              />
              <p className="">Sign up</p>
            </NavLink>
          </div>

          <Outlet />
        </div>
        <img className="w-1/2 mt-5" src={homeImg} alt="anons" />
      </div>
    </section>
  );
};

export default Authentication;

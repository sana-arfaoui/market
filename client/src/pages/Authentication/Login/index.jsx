import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate } from "react-router-dom";
import google from "../../../assets/icon/icons8-google.svg";
import { login } from "../../../redux/Actions/auth.action";
import Spinner from "../../../shared/Spinner";
const Login = () => {
  const dispatch = useDispatch();
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });
  const onInputChange = (e) => {
    e.preventDefault(); //man5alouch navigateur ya3mel relode
    setForm({ ...Form, [e.target.name]: e.target.value });
    console.log(Form);
  };
  const OnSubmitForm = (e) => {
    e.preventDefault();
    dispatch(login(Form));
    setForm({
      email: "",
      password: "",
    });
  };

  const { isLoading, isAuthenticated, user } = useSelector((state) => {
    return state.authReducers;
  });

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full  flex flex-col justify-center items-center ">
      <form
        onSubmit={(e) => OnSubmitForm(e)}
        className="flex flex-col gap-5 justify-center	items-center w-full"
      >
        <div className="relative w-96	sm:w-60 h-[3rem] sm:h-[2rem]">
          <input
            className=" outline-none focus:border-Primary pl-5 border-2 rounded-full border-gray   h-full w-full "
            onChange={(e) => onInputChange(e)}
            value={Form.email}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="email"
            required
          />
          <i className="z-[100] absolute text-2xl sm:text-sm text-Primary fa-regular fa-envelope right-5 top-[calc(50%-10px)]" />
        </div>
        <div className="relative  w-96	sm:w-60 h-[3rem] sm:h-[2rem]">
          <input
            className=" outline-none focus:border-Primary pl-5  border-2 border-gray rounded-full h-full   w-full "
            onChange={(e) => onInputChange(e)}
            value={Form.password}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
          <i className="absolute text-2xl sm:text-sm text-Primary fa-solid fa-lock right-5 top-[calc(50%-10px)]" />
        </div>

        <button
          type="submit"
          className="bg-info mb-5 hover:bg-infoDark text-white py-3  rounded-xl font-Montserrat font-semibold w-32 text-xl sm:text-xs mt-5"
        >
          SIGN IN
        </button>
      </form>
      <Link to="#" className="text-danger">
        Forget Password ?
      </Link>
      <p>
        you don't have an account,{" "}
        <Link to="/authentication/register" className="text-info">
          create now
        </Link>
      </p>
      <div className="flex items-center ">
        <div className="w-36  h-[0.1rem] bg-gray"></div>
        <p>or</p>
        <div className="w-36  h-[0.1rem] bg-gray"></div>
      </div>
      <button
        type="button"
        className="bg-white hover:bg-Primary hover:text-white text-black py-1 sm:py-0 px-16 sm:px-1 font-Montserrat font-semibold max-w-[70%] mt-5 flex flex-row gap-2 items-center border border-gray rounded-xl sm:text-[0.4rem]"
      >
        <img src={google} alt="dd" />
       <div className="sm-hidden">
       Continue with google
       </div>
      </button>
    </div>
  );
};

export default Login;

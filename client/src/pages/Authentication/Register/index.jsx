import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate, useLocation } from "react-router-dom";
import google from "../../../assets/icon/icons8-google.svg";
import { register } from "../../../redux/Actions/auth.action";
import Spinner from "../../../shared/Spinner";

import ConfirmationSend from "../../../shared/ConfirmationSend";

const Register = () => {
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [Form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipCode: "",
    county: "",
    number: "",
    confirmPassword: "",
  });
  let [isOpen, setIsOpen] = useState(false);
  const [Error, setError] = useState("");
  const [Message, setMessage] = useState("");
  const onInputChange = (e) => {
    e.preventDefault(); //man5alouch navigateur ya3mel relode
    setForm({ ...Form, [e.target.name]: e.target.value });
    // console.log(Form);
  };
  const { isLoading, isAuthenticated, user, isError, error } = useSelector(
    (state) => {
      return state.authReducers;
    }
  );

  const OnSubmitForm = (e) => {
    e.preventDefault(); //man5alouch navigateur ya3mel relode
    dispatch(
      register(
        { role: queries.has("role") ? queries.get("role") : "customer" },
        Form
      )
    );
    setForm({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      zipCode: "",
      county: "",
      number: "",
      confirmPassword: "",
    });
    setMessage(user.message);
    setError(error.message);
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className=" w-full  flex flex-col justify-center items-center">
      <form
        onSubmit={(e) => OnSubmitForm(e)}
        className="flex flex-col gap-5 justify-center	items-center max-w-maw"
      >
        {Message && (
          <div>
            {Message}
            {/* <ConfirmationSend
                    isOpen={isOpen}
                    closeModal={() => setIsOpen(false)}
                  /> */}
          </div>
        )}
        {/* {Error && <div> {Error}</div>} */}

        <div className="relative w-[27rem]	sm:w-60 h-12 sm:h-[2rem]">
          <input
            className=" outline-none focus:border-Primary pl-5  border-r-0 border-2 rounded-l-full border-gray   h-full w-1/2"
            onChange={(e) => onInputChange(e)}
            value={Form.firstName}
            type="text"
            name="firstName"
            id="firstName"
            autoComplete="firstName"
            placeholder="firstName"
            required
          />
          <input
            className=" outline-none focus:border-Primary border-l-0 border-2 rounded-r-full border-gray  h-full w-1/2 "
            onChange={(e) => onInputChange(e)}
            value={Form.lastName}
            type="text"
            name="lastName"
            id="lastName"
            autoComplete="lastName"
            placeholder="lastName"
            required
          />

          <i className="z-[100] absolute text-2xl sm:text-sm text-Primary fa-solid fa-user right-5 top-[calc(50%-10px)]" />
        </div>
        <div className="relative  w-[27rem]	sm:w-60 h-12 sm:h-[2rem] ">
          <input
            className=" outline-none focus:border-Primary pl-5 border-2 rounded-full border-gray h-full    w-full "
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
        <div className="relative  w-[27rem]	sm:w-60 h-12 sm:h-[2rem]  ">
          <input
            className=" outline-none focus:border-Primary pl-5 border-r-0   border-2 border-gray rounded-l-full h-full    w-1/2 "
            onChange={(e) => onInputChange(e)}
            value={Form.password}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
          <input
            className=" outline-none focus:border-Primary border-l-0  border-2 border-gray rounded-r-full h-full    w-1/2 "
            onChange={(e) => onInputChange(e)}
            value={Form.confirmPassword}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirmPassword"
            required
          />

          <i className="absolute text-2xl sm:text-sm text-Primary fa-solid fa-lock right-5 top-[calc(50%-10px)]" />
        </div>
        <div className="relative  w-[27rem]	sm:w-60 h-12 sm:h-[2rem]  ">
          <input
            className=" outline-none focus:border-Primary pl-5 border-r-0   border-2 border-gray rounded-l-full h-full    w-1/2 "
            onChange={(e) => onInputChange(e)}
            value={Form.country}
            type="text"
            name="country"
            id="country"
            placeholder="country"
            required
          />
          <input
            className=" outline-none focus:border-Primary border-l-0  border-2 border-gray rounded-r-full h-full    w-1/2 "
            onChange={(e) => onInputChange(e)}
            value={Form.city}
            type="text"
            name="city"
            id="city"
            placeholder="city"
            required
          />
          <i className="absolute text-2xl sm:text-sm text-Primary fa-solid fa-earth-africa right-5 top-[calc(50%-10px)]" />
        </div>
        <div className="relative  w-[27rem]	sm:w-60 h-12 sm:h-[2rem]  ">
          <input
            className=" outline-none focus:border-Primary pl-5 border-r-0   border-2 border-gray rounded-l-full h-full    w-1/2 "
            onChange={(e) => onInputChange(e)}
            value={Form.street}
            type="text"
            name="street"
            id="street"
            placeholder="street"
            required
          />
          <input
            className=" outline-none focus:border-Primary border-l-0  border-2 border-gray rounded-r-full h-full    w-1/2 "
            onChange={(e) => onInputChange(e)}
            value={Form.zipCode}
            type="number"
            name="zipCode"
            id="zipCode"
            placeholder="zipCode"
            required
          />

          <i className="absolute text-2xl sm:text-sm text-Primary fa-solid fa-lock right-5 top-[calc(50%-10px)]" />
        </div>
        <div>{isLoading && <Spinner />}</div>

        <div className="flex flex-row justify-center items-center gap-3 pt-5 w-[27rem]	sm:w-60 h-12 sm:h-[2rem] sm:flex-col">
          <button
            type="reset"
            className="bg-info hover:bg-infoDark text-white rounded-xl font-Montserrat font-semibold w-1/2  h-10"
          >
            REST
          </button>

          <button
            type="submit"
            className="bg-info hover:bg-infoDark text-white  rounded-xl font-Montserrat font-semibold w-1/2  h-10"
          >
            SIGN UP
          </button>
        </div>
      </form>

      <p className="mt-10">
        already have account,
        <Link to="/login" className="text-info">
          sign in now
        </Link>
      </p>
      <div className="flex items-center ">
        <div className="w-36  h-[0.1rem] bg-gray"></div>
        <p>or</p>
        <div className="w-36  h-[0.1rem] bg-gray"></div>
      </div>
      <button
        type="button"
        className="bg-white hover:bg-Primary hover:text-white text-black py-1 sm:py-0 px-16 sm:px-1  font-semibold max-w-[70%] mt-5 flex flex-row gap-2 items-center border border-gray rounded-xl sm:text-[0.5rem]"
      >
        <img className="sm:w-9" src={google} alt="dd" />
        Continue with google
      </button>
    </div>
  );
};

export default Register;

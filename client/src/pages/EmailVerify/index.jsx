import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import { Link, Navigate, useParams } from "react-router-dom";
import { emailVerify } from "../../redux/Actions/auth.action";
import NotFound from "../../shared/NotFound";
import Spinner from "../../shared/Spinner";
const EmailVerify = () => {
  const dispatch = useDispatch();

  const { id, tokenMail } = useParams();
 
  useEffect(() => {
    if (tokenMail) {
      dispatch(emailVerify(id, tokenMail));
    }
   
  }, [id, tokenMail]);
  const {isLoading, isVerify } = useSelector((state) => {
    return state.authReducers;
  });
  return isLoading ? (
    <Spinner/>
  ) :(
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-600 min-w-screen font-Roboto ">
      {isVerify ? (
        <div className="rounded-lg 	shadow-lg w-[40rem] gap-5  py-16 flex items-center justify-center flex-col bg-white ">
          <i className="text-9xl text-Success fa-regular fa-circle-check"></i>
          <h1 className=" font-medium text-2xl">Email verified successfully</h1>

          <Link
            to="/authentication/"
            className="bg-info  mb-2 flex mx-auto	hover:bg-infoDark text-white font-bold py-3 px-10 rounded-md text-xs max-w-max"
          >
            <p className="  ">Sign in</p>
          </Link>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default EmailVerify;

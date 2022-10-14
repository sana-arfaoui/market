import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/logo/dukkan2.png";
import onlineStore from "../../assets/image/onlineStore.png";
const Landing = () => {
  const { isLoading, isAuthenticated, user } = useSelector((state) => {
    return state.authReducers;
  });
  if (isAuthenticated) {
    if (user.role === "merchant") {
      return <Navigate to={"/dashboard"} />;
    }
    if (user.role === "customer") {
      return <Navigate to={`/home/${localStorage.store}`} />;
    }
  }

  return (
    <div className="bg-wave bg-no-repeat  px-5">
      <header className="flex items-center justify-between text-white text-2xl 	">
        <img src={logo} alt="logo" /> <Link to="#"> Start</Link>{" "}
        <Link to={`/home/${localStorage.store}`}> home</Link>
        <Link to="authentication/"> Sign in now</Link>
      </header>
      <div className="max-h-max  w-full flex flex-row flex-wrap items-end px-10">
        <div className="w-1/2 flex flex-col gap-2">
          <h1 className="text-8xl lg:text-8xl md:text-4xl">
            Bring you business online
          </h1>{" "}
          <p className="max-w-lg px-5">
            dukkan is an open-source, Headless, eMarket engine for small and
            medium brands-and everyone who wants to sell online{" "}
          </p>
        </div>
        <img className="w-1/2" src={onlineStore} alt="" />
      </div>
      <div className="flex flex-col gap-5 justify-center items-center pt-20">
        <div className="text-4xl">create your store now</div>
        <Link
          to="authentication/register?role=merchant"
          className=" bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded text-2xl"
        >
          Create Now
        </Link>
      </div>
      <footer className="flex flex-row justify-center gap-5 pt-20 pb-5">
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
      </footer>
    </div>
  );
};

export default Landing;

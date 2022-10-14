import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/DukkanT.svg";
const NotFound = () => {
  return (
    <div class="lg:gap-4 lg:flex px-4 lg:py-12 flex items-center justify-center w-1/2 flex-wrap">
      <div class="flex flex-col items-center justify-center md:py-24 lg:py-32">
        <h1 class="font-bold text-danger text-9xl">404</h1>
        <p class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          <span class="text-red-500">Oops!</span> Page not found
        </p>
        <p class="mb-8 text-center text-gray-500 md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          to={`/home/${localStorage.store}`}
          className="px-6 py-2 text-sm font-semibold text-white bg-info rounded-md hover:bg-infoDark"
        >
          Go home
        </Link>
      </div>
      <div class="mt-4 w-1/2">
        <img src={logo} alt="img" class="object-cover w-full  h-full" />
      </div>
    </div>
  );
};

export default NotFound;

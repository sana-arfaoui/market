import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const CategoryItem = ({ category }) => {
  const { isLoading, isAuthenticated, user } = useSelector((state) => {
    return state.authReducers;
  });
  return (
    <div className="w-72 h-52 rounded-lg flex flex-col items-center justify-between   hover:border bg-white">
      {user?.role === "merchant" && isAuthenticated ? (
        <Link className="w-full h-5/6" to="/dashboard/product">
          <img
            className="object-contain w-full h-full "
            src={category.image}
            alt={category.slug}
          />
        </Link>
      ) : (
        <Link className="w-full h-5/6" to={`/search?category=${category.slug}`}>
          <img
            className="hover:object-contain object-cover w-full h-full"
            src={category.image}
            alt={category.slug}
          />
        </Link>
      )}
      <p className="w-full text-center h-1/6"> {category.title}</p>
    </div>
  );
};

export default CategoryItem;

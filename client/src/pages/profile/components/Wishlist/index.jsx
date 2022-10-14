import React, { useEffect } from "react";
import ProductItem from "../../../../shared/ProductItem";
import Spinner from "../../../../shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getMyWishlist } from "../../../../redux/Actions/wishlist.action";
const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyWishlist());
  }, []);
  const { wishlist, isLoading } = useSelector((state) => {
    return state.wishlistReducers;
  });
  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <div className=" flex justify-between pt-5 px-5 sm:flex-col text-3xl md:text-2xl">
        <h1 className=" "> My wishlist </h1>
        <h1 className=" "> number of product :{wishlist.length}</h1>
      </div>
      <div className=" font-Roboto  grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center items-center px-5 gap-10 	 pt-4 pb-10">
        {wishlist.length > 0 &&
          wishlist.map((item) => <ProductItem key={item._id} product={item.product} />)}
      </div>
    </div>
  );
};

export default Wishlist;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link /*, useNavigate*/ } from "react-router-dom";
import { addToCart } from "../../redux/Actions/cart.action";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  addItemToWishlist,
  getMyWishlist,
} from "../../redux/Actions/wishlist.action";
const ProductItem = ({ product }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => {
    return state.authReducers;
  });
  const closeToast = () => {
    toast("added product successfully", { autoClose: 1500 });
  };
  const addWishlist = () => {
    toast("added to wishlist successfully", { autoClose: 1500 });
  };
  const loginFirst = () => {
    toast("login first", { autoClose: 1500 });
  };

  return (
    <div className="h-80 w-[14rem] relative shadow-xl rounded-2xl snap-center bg-white">
      {product.isLiked ? (
        <button
          type="button"
          onClick={() => {
            if (isAuthenticated) {
              dispatch(addItemToWishlist(product._id));
              dispatch(getMyWishlist());
              toast("remove from wishlist successfully", { autoClose: 1000 });
            } else {
              loginFirst();
            }
          }}
          className="left-2 top-2 absolute  rounded-full  w-5 h-5 flex justify-center items-center   bg-danger text-white"
        >
          <i className="fa-regular fa-heart "></i>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (isAuthenticated) {
              dispatch(addItemToWishlist(product._id));
              dispatch(getMyWishlist());
              addWishlist();
            } else {
              loginFirst();
            }
          }}
          className="left-2 top-2 absolute bg-white rounded-full  w-5 h-5 flex justify-center items-center  text-danger hover:bg-danger hover:text-white"
        >
          <i className="fa-regular fa-heart "></i>
        </button>
      )}

      <Link to={`/details/${product?.slug}`}>
        <img
          className="rounded-t-2xl h-2/3 ease-in-out w-full object-cover"
          src={product?.image}
          alt={product?.slug}
        />
      </Link>

      <div className="grid grid-col-1   h-1/3 w-full  pb-2 px-2 items-center">
        <div className="flex flex-row items-center justify-between">
          <h1 className=" truncate ">{product?.title}</h1>
          <ul className="flex justify-center">
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="star"
                className="w-4 text-yellow-500 mr-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="star"
                className="w-4 text-yellow-500 mr-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="star"
                className="w-4 text-yellow-500 mr-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="star"
                className="w-4 text-yellow-500 mr-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="star"
                className="w-4 text-yellow-500"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                ></path>
              </svg>
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="truncate">{product?.price} TND</div>

          <button
            onClick={() => {
              if (isAuthenticated) {
                dispatch(
                  addToCart({
                    product: product._id,
                    price: product.price,
                    quantity: 1,
                  })
                );
                closeToast();
              } else {
                loginFirst();
              }
            }}
            type="button"
            className="bg-info   mt-auto hover:bg-Primary text-white font-bold py-2 px-4 rounded-full"
          >
            add to bag
          </button>
        </div>
        <ToastContainer
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default ProductItem;

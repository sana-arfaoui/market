import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/logostore.svg";
import { Link, useParams } from "react-router-dom";
import ReviewItem from "../../shared/ReviewItem";
import { setStore } from "../../utils/setStore";
import { parseISO, format } from "date-fns";
import { getProduct } from "../../redux/Actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import YouMayAlsoLike from "../../shared/YouMayAlsoLike";
import Spinner from "../../shared/Spinner";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "../../redux/Actions/cart.action";
import AddReview from "../../shared/AddReview";
const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  setStore(localStorage.store);
  useEffect(() => {
    dispatch(getProduct(slug));
  }, [slug]);

  const { isLoading, product } = useSelector((state) => {
    return state.productReducers;
  });

  const { isAuthenticated } = useSelector((state) => {
    return state.authReducers;
  });

  let [isOpen, setIsOpen] = useState(false);
  const [IdProduct, setIdProduct] = useState(null);

  const [quantity, setQuantity] = useState(0);
  const { store } = useSelector((state) => {
    return state.storeReducers;
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Header />
      <section className="py-20 w-full font-Roboto">
        <div className="text-inherit"> Home/Category/cars/mercedes</div>
        <Link to="/">
          <div className="w-24 h-24 rounded-full mx-auto mb-10">
            <img
              className="rounded-full object-cover  w-full h-full"
              src={store?.logo}
              alt="storeLogo"
            />
          </div>
        </Link>

        {/* Product details */}

        <div className="flex gap-7 justify-center w-[90%] md:flex-col">
          <div className="w-1/2 md:min-w-[20rem] h-max mx-auto">
            <img
              className="object-cover  w-full h-full rounded-sm pb-4"
              src={product?.image}
              alt="car"
            />
          </div>
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className=" text-2xl font-semibold">
                Title :{product?.title}
              </h1>

              <ul className="flex justify-center drop-shadow-lg">
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

            <div className="pl-7  pt-7">
              <div>
                <div className="text-xl font-semibold pt-5"> Color :</div>
                <div className="flex gap-5 pt-5 pl-5">
                  <div className="min-w-[1.75rem] min-h-[1.75rem] rounded-full bg-slate-900 border border-Primary "></div>
                  <div className=" min-w-[1.75rem] min-h-[1.75rem] rounded-full bg-white border border-Primary "></div>
                  <div className="min-w-[1.75rem] min-h-[1.75rem] rounded-full bg-black border border-Primary "></div>
                  <div className="min-w-[1.75rem] min-h-[1.75rem] rounded-full bg-gray-400 border border-Primary "></div>
                  <div className="min-w-[1.75rem] min-h-[1.75rem] rounded-full bg-red-400 border border-Primary "></div>
                  <div className="min-w-[1.75rem] min-h-[1.75rem] rounded-full bg-blue-900 border border-Primary "></div>
                  <div className="min-w-[1.75rem] min-h-[1.75rem] rounded-full bg-red-700 border border-Primary "></div>
                </div>
              </div>
              <div className="pt-10">
                <div className="font-medium text-base pl-3 pb-5 flex flex-row justify-between">
                  <div>
                    {product?.countInStock > 0 ? (
                      <p className="text-green-700"> on stock</p>
                    ) : (
                      <p className="text-red-500"> out of stock</p>
                    )}
                  </div>
                  <div className="">price :{product?.price} TND</div>
                </div>
                <div className=" pb-2">
                  Category:
                  <span className="text-lg font-semibold">
                    {product?.category?.title}
                  </span>
                </div>

                <div className=" pb-2">
                  Added date:
                  <span className="text-lg font-semibold">
                    {/* {format(parseISO(product?.createdAt), "P")} */}
                  </span>
                </div>

                <div>
                  <div className="text-lg font-semibold pb-2"> Promotion</div>
                  {product?.isPromotion ? (
                    <div className="text-green-700"> is on promtion</div>
                  ) : (
                    <div className="text-red-500"> not on promotion </div>
                  )}
                </div>
                <div className="text-xl font-semibold">description</div>
                <div className="pl-5 w-80">{product?.description}</div>
              </div>

              <div className="py-5">
                <div className="text-gray-500	"> SHARE</div>
                <i className="fa-brands fa-facebook-f px-3 text-lg text-Primary	 "></i>
                <i className="fa-brands fa-linkedin-in px-3 text-lg text-Primary"></i>
                <i className="fa-brands fa-instagram px-3 text-lg text-Primary"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4  border  items-center border-Primary mx-auto rounded-lg shadow-xl w-[60rem]	 h-24	 mt-16 px-10">
          <div className="text-xl">Order Summary</div>
          <div className="flex h-full items-center gap-2 ">
            <div className="w-1/2 h-20 ">
              <img
                className="object-contain w-full h-full rounded-xl"
                src={product?.image}
                alt="car"
              />
            </div>
            <div className="w-1/2">
              <div className="text-xl font-semibold"> {product?.title}</div>
              <div className="truncate "> {product?.description}</div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setQuantity((Q) => Q - 1)}
              className="rounded-full w-5 h-5  bg-Warning flex justify-center items-center"
            >
              <i className=" text-white fa-solid fa-minus"></i>
            </button>
            <div className=" border border-neutral-400 px-10">{quantity}</div>
            <button
              onClick={() => setQuantity((Q) => Q + 1)}
              className="rounded-full w-5 h-5  bg-Success flex justify-center items-center"
            >
              <i className="fa-solid fa-plus text-white"></i>
            </button>
          </div>
          <div>{product?.price} TND</div>

          <button
            onClick={() => {
              if (isAuthenticated) {
                dispatch(
                  addToCart({
                    product: product._id,
                    price: product.price,
                    quantity: quantity,
                  })
                );
              } else {
                toast("login first", { autoClose: 500 });
              }
            }}
            type="button"
            className="bg-info hover:bg-infoDark text-white font-bold py-2 px-4 rounded-full w-32"
          >
            add to Cart
          </button>
        </div>
        <ToastContainer autoClose={1000} />
        <button
          onClick={() => {
            if (isAuthenticated) {
              setIsOpen(true);
              setIdProduct(product._id);
            } else {
              toast("login first", { autoClose: 500 });
            }
          }}
          type="button"
          className=" mt-10 bg-info hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl flex justify-center maw-w-max mx-auto"
        >
          Add Review
        </button>
        <AddReview
          isOpen={isOpen}
          closeModal={() => {
            setIsOpen(false);
            dispatch(getProduct(slug));
          }}
          id={IdProduct}
        />
        <div className="flex flex-1 gap-5 overflow-x-auto snap-x justify-center	snap-mandatory py-16">
          {/* //*---------------------review--------------------------------------------------------------------------------------------------- */}
          {product?.reviews?.length > 0 ? (
            product.reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))
          ) : (
            <div className=" bg-white">
              <h1 className="text-center"> Review</h1>
              <p>no reviews for this product</p>
            </div>
          )}
          {/* //*------------------------------------------------------------------------------------------------------------------------ */}
        </div>

        <div className="w-max mx-auto pt-24"> YOU MAY ALSO LIKE</div>

        {/* <YouMayAlsoLike/> */}
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails;

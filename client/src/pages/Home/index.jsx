import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../shared/Header";
import direction from "../../assets/icon/directionA.svg";
import directionB from "../../assets/icon/directionB.svg";
import productImg from "../../assets/image/imgProduct.svg";
import Spinner from "../../shared/Spinner";
import { getProductsByStore } from "../../redux/Actions/product.action";
import vdAbout from "../../assets/video/cars.mp4";
import ReactPlayer from "react-player";
import Footer from "../../shared/Footer";
import { setStore } from "../../utils/setStore";
import ProductItem from "../../shared/ProductItem";
import CategoryItem from "../../shared/CategoryItem";
import { getOwnedCart } from "../../redux/Actions/cart.action";
import { Fragment } from "react";
import { logout } from "../../redux/Actions/auth.action";
import { get_categories_By_store } from "../../redux/Actions/category.action";

import styled from "styled-components";

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Home = () => {
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const navigate = useNavigate();
  //setStore(localStorage.store);
  const [slideIndex, setSlideIndex] = useState(0);
  if (storeId === "undefined" || !localStorage.store) {
    dispatch(logout());
    navigate("/");
  }
  useEffect(() => {
    setStore(storeId);
  }, []);

  useEffect(() => {
    dispatch(get_categories_By_store());
  }, []);

  const { categories } = useSelector((state) => {
    return state.categoryReducers;
  });

  useEffect(() => {
    dispatch(getProductsByStore());
  }, []);
  const { products, isLoading } = useSelector((state) => {
    return state.productReducers;
  });
  const { isAuthenticated } = useSelector((state) => {
    return state.authReducers;
  });
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOwnedCart());
    }
  }, [isAuthenticated]);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
    }
  };
  return (
    <div className="bg-wavee bg-no-repeat  font-Roboto">
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Header />

          <section className="pt-10  w-full ">
            <div className="w-full h-full flex relative overflow-hidden sm:hidden px-10 ">
              <Arrow direction="left" onClick={() => handleClick("left")}>
                <img
                  className="max-w-[4rem] "
                  src={directionB}
                  alt="direction"
                />
              </Arrow>
              <Wrapper slideIndex={slideIndex}>
                {products.map((item) => (
                  <div
                    className="w-screen h-screen flex items-center justify-center "
                    key={item._id}
                  >
                    <div className="flex-1 max-h-[30rem]	rounded-2xl		">
                      <img
                        src={item.image}
                        alt=""
                        className=" rounded-2xl	 w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex  flex-1 p-14 justify-evenly flex-col">
                      <h1 className="text-2xl font-semibold">{item.title}</h1>

                      <p className="text-xl	 font-medium tracking-widest		 sm:w-0">
                        {item.description}
                      </p>
                      <Link
                        to={`/details/${item?.slug}`}
                        className="bg-white self-end mt-12  hover:bg-slate-300	 text-info  font-bold py-3 px-8 rounded-full max-w-max "
                      >
                        Discover Now
                      </Link>
                    </div>
                  </div>
                ))}
              </Wrapper>
              <Arrow direction="right" onClick={() => handleClick("right")}>
                <img className="max-w-[4rem]" src={direction} alt="direction" />
              </Arrow>
            </div>

            <div className="justify-center pt-20  flex flex-col items-center w-full">
              <h1 className="text-2xl font-medium pb-5">Our Top Categories</h1>
              <div className="flex flex-row items-center justify-center gap-5 flex-wrap  w-full ">
                {categories.slice(0, 4).map((category) => (
                  <CategoryItem key={category._id} category={category} />
                ))}
              </div>
              <h1 className="text-2xl font-medium pb-5 pt-28">
                Popular Product
              </h1>

              <div className="flex gap-12 overflow-x-auto snap-x w-[90%] snap-mandatory pt-4 pl-10 pb-10 justify-center">
                {products.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </div>

              <h1 className="text-2xl font-medium pb-5 pt-10">New Product</h1>

              <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center items-center  gap-12 	 pt-4 pl-10 pb-10">
                {products.slice(0, 13).map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </div>
            </div>
            <div className=" flex justify-center items-center flex-col">
              <h2 className="pt-8 text-3xl">About us</h2>
              <div className="flex gap-20 items-center pb-10 pl-10 flex-wrap">
                <ReactPlayer
                  className="react-player fixed-bottom max-w-lg"
                  url={vdAbout}
                  controls={true}
                />

                <div className="max-w-xl flex flex-col ">
                  <h1 className="pb-10 text-xl	 font-semibold	"> about us</h1>
                  <p>
                    ipsum dolor, sit amet consectetur adipisicing elit.
                    Voluptatibus, maxime delectus. Officia porro maxime
                    perferendis hic dolorum. Ut facilis quasi iure recusandae
                    ducimus ipsum reiciendis velit minima ipsa. Nihil voluptas
                    blanditiis dolores quos, voluptates voluptatem ab eaque,
                    molestiae, consectetur sit laudantium exercitationem!
                    Consequuntur soluta, odio doloremque voluptatem eligendi
                    dolor.
                  </p>
                  <button className="bg-info self-end  hover:bg-Primary	 text-white  font-bold py-3 px-8 rounded-full max-w-max ">
                    Discover Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}

      <Footer />
    </div>
  );
};

export default Home;

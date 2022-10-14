import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../../redux/Actions/product.action";
import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import Spinner from "../../shared/Spinner";
import { getProductsByStore } from "../../redux/Actions/product.action";
import ProductItem from "../../shared/ProductItem";
import { setStore } from "../../utils/setStore";
import { get_categories_By_store } from "../../redux/Actions/category.action";
import LoadingAnimation from "../../shared/LoadingAnimation";

const Search = () => {
  setStore(localStorage.store);
  const location = useLocation();
  /* Creating a new URLSearchParams object and setting it to the variable queries. */
  const queries = new URLSearchParams(location.search);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductsByStore({
        q: queries.has("q") ? queries.get("q") : "",
        category: queries.has("category") ? queries.get("category") : "",
      })
    );
  }, [queries.get("q"), queries.get("category")]);

  const [Query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(Query);
  const search = (e) => {
    e.preventDefault(); //man5alouch navigateur ya3mel relode
    dispatch(
      getProductsByStore({
        q: Query,
      })
    );
  };

  const { isLoading, products } = useSelector((state) => {
    return state.productReducers;
  });
  useEffect(() => {
    dispatch(get_categories_By_store({}));
  }, []);
  useEffect(() => {
    dispatch(
      getProductsByStore({
        category: selectedCategory,
      })
    );
  }, [selectedCategory]);

  const { categories } = useSelector((state) => {
    return state.categoryReducers;
  });

  return (
    <div>
      <Header />
      <section className="pb-6 pt-20  font-Roboto">
        <div className="text-gray-400">Home/Search/Category/product</div>

        <div className="rounded-l-full mx-auto flex items-center	 relative max-w-xl justify-between border  shadow-md">
          <button
            onClick={(e) => search(e)}
            type="button"
            className="absolute left-2"
          >
            <i className="fa-solid fa-magnifying-glass  text-2xl cursor-pointer "></i>
          </button>
          <input
            className="pl-10 py-4  w-4/5 rounded-l-full outline-none "
            type="search"
            name="search"
            onChange={(e) => setQuery(e.target.value)}
            value={Query}
            id="search"
            placeholder="Searsh here...."
          />
          <div className="h-9 rounded-full bg-slate-900 border border-Primary "></div>
          <div className="flex gap-2 w-1/5  pl-2">
            <div> Stored by </div>
            <i className="fa-solid fa-angle-up"></i>
          </div>
        </div>

        <div className="flex  flex-row   pl-32 items-start pt-20">
          <div className="py-5  px-10 w-72 bg-white rounded-2xl ">
            <div className="flex justify-between items-center pr-1 pb-3">
              <div className="font-bold"> FILTERS</div>
              <div className="text-red-500 text-xs">CLEAR</div>
            </div>
            <div className="relative pt-1">
              <label htmlFor="PriceRange" className="form-label">
                Price range
              </label>
              <input
                type="range"
                className="form-range   w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none "
                id="PriceRange"
              />
            </div>
            <div className="pb-5">Categories</div>
            <div>
              <div className=" flex gap-3 py-3 pl-5">
                <input
                  className="w-5 h-5  border border-Primary"
                  type="radio"
                  name="allProducts"
                  value=""
                  id="allProducts"
                  checked={selectedCategory === ""}
                  onChange={() => setSelectedCategory("")}
                />
                <label htmlFor="allProducts">All Products</label>
              </div>
              <div className="flex flex-col  overflow-y-auto snap-y h-96	 snap-mandatory">
                {categories.length > 0 &&
                  categories.map((category) => (
                    <div className=" flex gap-3 py-3 pl-5  snap-center">
                      <input
                        className="w-5 h-5  border border-Primary"
                        type="radio"
                        id={category._id}
                        name={category.slug}
                        value={category.slug}
                        checked={category.slug === selectedCategory}
                        onChange={() => setSelectedCategory(category.slug)}
                      />
                      <label htmlFor={category._id}>{category.title}</label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="h-screen rounded-full bg-slate-900 border border-Primary "></div>
          <div className="">
            <div className="pl-4">
              <div>21 items found</div>
              <div className="text-gray-400">
                {" "}
                showing 11 to 20 of 21 entries
              </div>
            </div>

            <div className=" grid grid-cols-4 gap-12 md:gap-4 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 pt-4 pl-10">
              {isLoading ? (
                <LoadingAnimation />
              ) : (
                products.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex  justify-between items-baseline ml-72">
          <button className="bg-white hover:bg-gray-100  font-semibold py-2 px-4 border-gray-400 rounded shadow">
            Previous
          </button>
          <div className="flex gap-4 items-baseline">
            <div>1</div>
            <div className="bg-Primary px-2 py-1 text-white">2</div>
            <div>3</div>
            <div className="text-gray-400">4</div>
          </div>
          <button className="bg-white hover:bg-gray-100  font-semibold py-2 px-4 border-gray-400 rounded shadow">
            Next
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Search;

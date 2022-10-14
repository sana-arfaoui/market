import React, { Fragment, useState, useEffect } from "react";
import { Combobox, Transition, Dialog } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../shared/Spinner";
import { updateProduct } from "../../../../redux/Actions/product.action";
import { getProducts } from "../../../../redux/Actions/product.action";
import AlertDelete from "../../../../shared/AlertDelete";
const Product = () => {
  const { categories } = useSelector((state) => {
    return state.categoryReducers;
  });
  const [selected, setSelected] = useState(categories[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [query, setQuery] = useState("");
  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category) =>
          category.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ limit: 999 }));
  }, []);

  const { isLoading, products } = useSelector((state) => {
    return state.productReducers;
  });
  let [isOpenD, setIsOpenD] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  const [Promotion, setPromotion] = useState(false);
  const [IdProduct, setIdProduct] = useState(null);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [Form, setForm] = useState({
    title: "",
    price: "",
    countInStock: "",
    reference: "",
    description: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  const openModal = (e, index) => {
    e.preventDefault();
    const product = products[index];
    //const category = categories[index];

    setForm({
      title: product.title,
      price: product.price,
      countInStock: product.countInStock,
      reference: product.reference,

      description: product.description,
    });
    //!
    //  setPromotion(Promotion[index])
    // setFile(file[index]);
    // selectedCategory(category);
    setIsOpen(true);
  };

  const onInputChange = (e) => {
    e.preventDefault();

    setForm({ ...Form, [e.target.name]: e.target.value });
    console.log(Form);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const product = new FormData();
    product.append("title", Form.title);
    product.append("price", Form.price);
    product.append("countInStock", Form.countInStock);
    product.append("category", selectedCategory._id);
    product.append("isPromotion", Promotion);
    product.append("reference", Form.reference);
    product.append("description", Form.description);
    product.append("image", file);
    dispatch(updateProduct(IdProduct, product));
    setPromotion(false);
    setUrl("");
    setFile(null);
    setForm({
      ...Form,
      title: "",
      price: "",
      countInStock: "",
      reference: "",
      // category: "",
      description: "",
    });
    setIsOpen(false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="font-Roboto">
      <div className="flex flex-row justify-between items-center px-10 py-11  ">
        <p>Products</p>
        <div className="w-56">
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                <Combobox.Input
                  className="w-full border-none  focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 "
                  displayValue={(category) => category?.title}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredCategories.length === 0 && query !== "" ? (
                    <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredCategories.map((category) => (
                      <Combobox.Option
                        key={category._id}
                        className={({ active }) =>
                          `cursor-default select-none relative py-2 pl-10 pr-4 ${
                            active ? "text-white bg-info" : "text-gray-900"
                          }`
                        }
                        value={category}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {category.title}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>

      <div className="pt-10 w-[94%] m-auto">
        <div className="flex flex-row justify-between font-semibold">
          <p className="pr-6">Product details </p> <p>Category</p> <p>Price</p>
          <p>Stock </p> <p>Reference</p> <p>Promotion </p> <p>Rate</p>
          <p>Action</p>
        </div>
        <hr className=" text-gray" />
        <div className="py-4 w-full flex flex-col justify-center pt-10 gap-5 ">
          {products?.length > 0 &&
            products?.map((product, index) => {
              return (
                <div
                  key={product._id}
                  className="  w-full rounded-lg bg-white  max-h-20  flex flex-row  items-center shadow-md	py-2 px-2"
                >
                  <div className=" flex flex-row items-center gap-3 w-[20%]">
                    <img
                      className=" h-full max-w-[30%] object-contain rounded-md"
                      src={product.image}
                      alt=""
                    />
                    <div className="w-[70%]">
                      <p>{product.title}</p>
                      <p className="truncate w-full text-[14px]">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-row justify-between ">
                    <div> {product.category?.title}</div>
                    <div>{product.price} TND</div>
                    <div>{product.countInStock}</div>
                    <div>{product.reference}</div>
                    <div>
                      {product?.isPromotion ? <div> yes</div> : <div> no </div>}
                    </div>
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
                    <div className="flex flex-row gap-2 items-center">
                      <div>
                        <button
                          type="button"
                          onClick={(e) => {
                            openModal(e, index);
                            setIdProduct(product._id);
                          }}
                          className="bg-white border-2 py-[0.38rem] px-2 hover:bg-info hover:text-white text-Success"
                        >
                          <i className="fa-solid fa-pen-to-square "></i>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIdProduct(product._id);
                          setIsOpenD(true);
                        }}
                        className="bg-white border-2 py-1 px-2 hover:bg-info hover:text-white text-danger"
                      >
                        <i className="fa-solid fa-trash "></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* aleretUpdate */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
            >
              <div className="min-h-screen px-4 text-center bg-black bg-opacity-50 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className=" inline-block   py-6 px-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      update product
                    </Dialog.Title>
                    <form
                      onSubmit={(e) => onSubmitForm(e)}
                      className=" bg-white font-Roboto    mx-auto w-full  px-10 py-10  flex flex-row overflow-y-auto "
                    >
                      <div className="flex flex-col gap-7 w-1/2">
                        <div className="flex flex-col gap-2 w-[80%]">
                          <label className="" htmlFor="title">
                            Product Name
                          </label>
                          <input
                            className="outline-none border focus:border-Primary px-2 py-2 rounded-lg"
                            onChange={(e) => onInputChange(e)}
                            value={Form.title}
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Product Name"
                          />
                        </div>
                        <div className="flex flex-row justify-between w-full">
                          <div className="flex flex-col w-[45%]">
                            <label htmlFor="price">Price</label>
                            <input
                              className="outline-none border focus:border-Primary px-2 py-2 rounded-lg"
                              onChange={(e) => onInputChange(e)}
                              value={Form.price}
                              type="number"
                              name="price"
                              id="price"
                              placeholder="0000 TND"
                            />
                          </div>
                          <div className="flex flex-col w-[45%]">
                            <label htmlFor="countInStock">Count in stock</label>
                            <input
                              className="outline-none border focus:border-Primary px-2 py-2 rounded-lg"
                              onChange={(e) => onInputChange(e)}
                              value={Form.countInStock}
                              type="number"
                              name="countInStock"
                              id="countInStock"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row justify-between  w-full">
                          <div className="flex  flex-col justify-center w-[45%]">
                            <label htmlFor="category">Category</label>

                            <div className="w-full ">
                              <Combobox
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                              >
                                <div className="relative mt-1">
                                  <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                                    <Combobox.Input
                                      className="w-full border-none  focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 "
                                      displayValue={(category) =>
                                        category.title
                                      }
                                      onChange={(event) =>
                                        setQuery(event.target.value)
                                      }
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                      <SelectorIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </Combobox.Button>
                                  </div>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setQuery("")}
                                  >
                                    <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {filteredCategories.length === 0 &&
                                      query !== "" ? (
                                        <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                                          Nothing found.
                                        </div>
                                      ) : (
                                        filteredCategories.map((category) => (
                                          <Combobox.Option
                                            key={category._id}
                                            className={({ active }) =>
                                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                                active
                                                  ? "text-white bg-info"
                                                  : "text-gray-900"
                                              }`
                                            }
                                            value={category}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <span
                                                  className={`block truncate ${
                                                    selected
                                                      ? "font-medium"
                                                      : "font-normal"
                                                  }`}
                                                >
                                                  {category.title}
                                                </span>
                                                {selected ? (
                                                  <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                      active
                                                        ? "text-white"
                                                        : "text-teal-600"
                                                    }`}
                                                  >
                                                    <CheckIcon
                                                      className="w-5 h-5"
                                                      aria-hidden="true"
                                                    />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Combobox.Option>
                                        ))
                                      )}
                                    </Combobox.Options>
                                  </Transition>
                                </div>
                              </Combobox>
                            </div>
                          </div>

                          <div className="flex flex-col w-[45%]">
                            <label htmlFor="reference">Reference</label>
                            <input
                              className="outline-none border focus:border-Primary px-2 py-2 rounded-lg"
                              onChange={(e) => onInputChange(e)}
                              value={Form.reference}
                              type="text"
                              name="reference"
                              id="reference"
                              placeholder="ref"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <label htmlFor="isPromotion">Promotion</label>
                          <input
                            onChange={(e) => setPromotion(e.target.checked)}
                            type="checkbox"
                            name="isPromotion"
                            id="isPromotion"
                          />
                        </div>

                        <div>
                          <label className="" htmlFor="description">
                            Description
                          </label>
                          <textarea
                            onChange={(e) => onInputChange(e)}
                            value={Form.description}
                            name="description"
                            className=" form-control block w-full px-3    rounded-lg   py-1.5       text-base       font-normal        text-gray-700       bg-white bg-clip-padding      border border-solid border-gray-300  transition        ease-in-out    m-0       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  "
                            id="description"
                            rows="3"
                            placeholder="Your message"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex flex-col gap-5 w-1/2 pl-5">
                        <h3>Product image</h3>
                        <div className="">
                          <label
                            htmlFor="image"
                            className="flex flex-col items-center bg-info rounded-md text-white px-10 py-1 max-w-max"
                          >
                            <p> Upload image</p>
                            <i className="fa-solid fa-upload"></i>
                          </label>
                          <input
                            hidden
                            type="file"
                            name="image"
                            id="image"
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                              setUrl(URL.createObjectURL(e.target.files[0]));
                            }}
                          />
                          <img
                            className=" max-w-sm mt-5 rounded-lg drop-shadow-lg"
                            src={url}
                          />
                        </div>
                        <div className="flex justify-end mt-auto">
                          <button
                            type="submit"
                            className="bg-info hover:bg-Primary text-white py-3  rounded-xl font-Montserrat font-semibold px-5"
                          >
                            Update Product
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
          {/* alertDelete */}
          <AlertDelete
            isOpen={isOpenD}
            closeModal={() => setIsOpenD(false)}
            id={IdProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;

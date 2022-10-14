import React, { Fragment,  useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate} from "react-router-dom";
import { addProduct } from "../../../../redux/Actions/product.action";
import Spinner from "../../../../shared/Spinner";
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, categories } = useSelector((state) => {
    return state.categoryReducers;
  });

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

  const [Promotion, setPromotion] = useState(false);
  //console.log(Promotion);

  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [Form, setForm] = useState({
    title: "",
    price: "",
    countInStock: "",
    reference: "",
    category: "",

    description: "",
  });
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

    dispatch(addProduct(product));
    setPromotion(false);
    setUrl("");
    setFile(null);
    setForm({
      ...Form,
      title: "",
      price: "",
      countInStock: "",
      reference: "",
      category: "",

      description: "",
    });
    navigate("/dashboard/product");
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <form
      onSubmit={(e) => onSubmitForm(e)}
      className=" bg-white font-Roboto shadow-xl   mx-auto w-[80%] mt-32 px-10 py-10  flex flex-row overflow-y-auto rounded-lg"
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
            required
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
              required
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
              required
            />
          </div>
        </div>
        <div className="flex flex-row justify-between  w-full">
          <div className="flex  flex-col justify-center w-[45%]">
            <label htmlFor="category">Category</label>

            <div className="w-full ">
              <Combobox value={selectedCategory} onChange={setSelectedCategory}>
                <div className="relative mt-1">
                  <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                    <Combobox.Input
                      className="w-full border-none  focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 "
                      displayValue={(category) => category.title}
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
              required
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
          <img className=" max-w-sm mt-5 rounded-lg drop-shadow-lg" src={url} />
        </div>
        <div className="flex justify-end mt-auto">
          <button
            type="submit"
            className="bg-info hover:bg-Primary text-white py-3  rounded-xl font-Montserrat font-semibold px-5"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;

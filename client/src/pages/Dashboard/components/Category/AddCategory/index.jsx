import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  add_Categories,
  getCategories,
} from "../../../../../redux/Actions/category.action";
const AddCategory = ({ isOpen, closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [Form, setForm] = useState({
    title: "",
    // description: "",
  });
  const onInputChange = (e) => {
    e.preventDefault();
    setForm({ ...Form, [e.target.name]: e.target.value });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const category = new FormData();
    category.append("title", Form.title);
    category.append("image", file);
    dispatch(add_Categories(category));
    setFile(null);
    setForm({
      ...Form,
      title: "",

      //  description: "",
    });
    dispatch(getCategories());
    closeModal();
  };
  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="bg-black min-h-screen px-4 text-center  bg-secondary-dark bg-opacity-50">
          <Dialog.Overlay className="fixed inset-0" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className=" bg-white inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-secondary shadow-xl rounded-2xl font-roboto">
            <Dialog.Title as="h3" className="text-primary font-bold text-2xl">
              add Category
            </Dialog.Title>
            <form onSubmit={(e) => onSubmitForm(e)}>
              <label className="block mb-6 text-left">
                <span className="text-gray-700 pl-2">category</span>
                <input
                required
                  value={Form.title}
                  onChange={(e) => onInputChange(e)}
                  name="title"
                  type="text"
                  className="py-2 pl-2              
             block
             w-full
             focus:outline-none
             border-gray-300
             rounded-md
             shadow-sm
             focus:border-indigo-300
             focus:ring
             focus:ring-indigo-200
             focus:ring-opacity-50
           "
                  placeholder="example adidas"
                />
              </label>
              <label
                htmlFor="image"
                className=" flex flex-col items-center bg-info rounded-md text-white  py-1  w-[25%] hover:bg-infoDark"
              >
                <p className="text-xs sm:truncate sm:w-0 sm:h-0">
                  Upload image
                </p>
                <i className="fa-solid fa-upload"></i>
              </label>

              <input
              required
                hidden
                type="file"
                name="image"
                id="image"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setUrl(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <div className=" w-48 h-32 md:w-48 md:h-48  sm:w-24 sm:h-24  ">
                <img
                  src={url}
                  alt="..."
                  className="shadow rounded-md object-cover  w-full h-full border-none "
                />
              </div>

              <div className=" mx-auto max-w-md mt-5	">
                <button
                  type="submit"
                  className="               
             h-10
             px-5
             text-indigo-100
             bg-info
             rounded-lg
             transition-colors
             duration-150                                                                                                                                                                                                                                                                                
             focus:shadow-outline
             hover:bg-infoDark
           "
                >
                  save
                </button>
              </div>
            </form>

            <div className="mt-4"></div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddCategory;

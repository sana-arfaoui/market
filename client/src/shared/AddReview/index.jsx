import React from "react";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add_Review } from "../../redux/Actions/review.action";

const AddReview = ({ isOpen, closeModal, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);
  const dispatch = useDispatch();
  const [Form, setForm] = useState({
    rating: "",
    comment: "",
  });
  const onInputChange = (e) => {
    e.preventDefault();
    setForm({ ...Form, [e.target.name]: e.target.value });
    console.log(Form);
  };
  const onSubmitForm = (e, id) => {
    e.preventDefault();
    dispatch(add_Review(Form, id));
    setForm({
      ...Form,
      rating: "",
      comment: "",
    });

    closeModal();
  };
  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        onClose={closeModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className=" bg-black  px-4 text-center  bg-secondary-dark bg-opacity-50">
          <Dialog.Overlay className="fixed inset-0" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className=" inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className=" bg-white  inline-block  max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-secondary  rounded-2xl font-roboto">
            <Dialog.Title
              as="h3"
              className="text-primary font-bold text-2xl text-center"
            >
              add Review{" "}
            </Dialog.Title>
            <div className="block p-6 rounded-lg  max-w-md">
              <form onSubmit={(e) => onSubmitForm(e, id)}>
                <div className="flex flex-row gap-5 mb-6 justify-center items-center">
                  <div className="form-group ">
                    <input
                      onChange={(e) => onInputChange(e)}
                      value={Form.rating}
                      name="rating"
                      required
                      type="number"
                      max={5}
                      min={0}
                      className="form-control block focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none border border-solid border-gray-300 bg-white bg-clip-padding w-full px-3 py-1.5
text-base
font-normal
text-gray-700
rounded
transition
ease-in-out
m-0
"
                      id="exampleInput8"
                      placeholder="rate"
                    />
                  </div>
                  <div className="form-group ">
                    <textarea
                      minLength="10"
                      maxlength="57"
                      onChange={(e) => onInputChange(e)}
                      value={Form.comment}
                      name="comment"
                      required
                      className="form-control block w-full focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none border border-solid border-gray-300 bg-white bg-clip-padding
px-3
py-1.5
text-base
font-normal
text-gray-700
rounded
transition
ease-in-out
m-0"
                      id="exampleFormControlTextarea13"
                      rows="3"
                      placeholder="comment"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className=" w-full px-6 py-2.5
bg-blue-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddReview;

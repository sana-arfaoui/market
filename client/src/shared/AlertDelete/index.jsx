import { Dialog } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteProduct,
  updateProduct,
} from "../../redux/Actions/product.action";
const AlertDelete = ({ isOpen, closeModal, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);
  const closeToast = () => {
    toast("added product successfully", { autoClose: 1500 });
  };
  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        className="fixed  inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className=" bg-slate-500 min-h-screen px-4 text-center  bg-secondary-dark bg-opacity-50">
          <Dialog.Overlay className="fixed inset-0" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className=" bg-white border-danger border inline-block w-[25%]  p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-secondary shadow-xl rounded-2xl font-roboto">
            <Dialog.Title
              as="h3"
              className="text-primary font-bold text-2xl text-center"
            >
              confirm delete
            </Dialog.Title>

            <div className="mt-4 mx-auto  flex  justify-around">
              <button
                type="button"
                onClick={() => {
                  dispatch(deleteProduct(id));
                  closeModal();
                  closeToast();
                }}
                className="bg-white border-2 py-[0.38rem] px-10 hover:bg-info hover:text-white text-Success"
              >
                Yes
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="bg-white border-2 py-1 px-10 hover:bg-info hover:text-white text-danger"
              >
                No
              </button>
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
        </div>
      </Dialog>
    </>
  );
};

export default AlertDelete;

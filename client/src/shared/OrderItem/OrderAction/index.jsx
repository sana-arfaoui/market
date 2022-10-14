import React from "react";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  confirmedOrder,
  canceledOrder,
  fulfilledOrder,
  merchantOrders,
} from "../../../redux/Actions/order.action";
const OrderAction = ({ isOpen, closeModal, id }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
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
          <div className="   inline-block  max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-secondary  rounded-2xl font-roboto">
            <Dialog.Title
              as="h3"
              className="text-primary font-bold text-2xl text-center"
            ></Dialog.Title>

            <div className=" flex flex-wrap gap-5">
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  dispatch(confirmedOrder(id));
                }}
                className="inline-flex   flex-col items-center justify-center rounded-md border border-transparent bg-info px-4 py-0.5 text-sm font-medium text-white hover:bg-infoDark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <i className=" text-3xl	   fa-regular fa-circle-check"></i>
                <div className=" "> confirm</div>
              </button>

              <button
                onClick={() => {                 
                  closeModal();
                  dispatch(fulfilledOrder(id));
                  
                }}
                type="button"
                className="inline-flex   flex-col items-center justify-center rounded-md border border-transparent bg-Success hover:bg-SuccessDark px-4 py-0.5 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <i className=" text-3xl	 fa-solid fa-clipboard-check"></i>
                <div> fulfill</div>
              </button>
              <button
                onClick={() => {
                  closeModal();
                  dispatch(canceledOrder(id));
                }}
                type="button"
                className="inline-flex   flex-col items-center justify-center rounded-md border border-transparent bg-danger px-4 py-0.5 text-sm font-medium text-white hover:bg-dangerDark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <i className=" text-3xl fa-regular fa-rectangle-xmark"></i>
                <div>cancel</div>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default OrderAction;

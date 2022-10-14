import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
const ConfirmationSend = ({ isOpen, closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);
  return (
    <Dialog
      open={isModalOpen}
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={closeModal}
    >
      <div className="min-h-screen px-4 text-center  bg-secondary-dark bg-opacity-50">
        <Dialog.Overlay className="fixed inset-0" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-secondary shadow-xl rounded-2xl font-roboto">
          <Dialog.Title as="h3" className="text-primary font-bold text-2xl">
            Set product info
          </Dialog.Title>

          <div>ffzerfgzefgergrreegereger</div>
          {/* <div class="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
            <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 class="text-2xl">Thanks for signing up for Websitename!</h3>
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" stroke-width="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>

                <p>We're happy you're here. Let's get your email address verified:</p>
                <div class="mt-4">
                    <button class="px-2 py-2 text-blue-200 bg-blue-600 rounded">Click to Verify Email</button>
                    <p class="mt-4 text-sm">If you’re having trouble clicking the "Verify Email Address" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                        <a href="#" class="text-blue-600 underline">http://localhost:8000/email/verify/3/1ab7a09a3</a>
                    </p>
                </div>
            </div>
        </div> */}
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationSend;

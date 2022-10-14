import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStore } from "../../../../redux/Actions/store.action";
const Store = ({ isOpen, closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);
  const { store } = useSelector((state) => {
    return state.storeReducers;
  });
  const [Form, setForm] = useState({
    title: store?.title,
    bio: store?.bio,
  });
  const [file, setFile] = useState("");
  const [urlLogo, setUrlLogo] = useState(store?.logo);

  const onInputChange = (e) => {
    e.preventDefault();
    setForm({ ...Form, [e.target.name]: e.target.value });
    console.log(Form);
  };
  const onSubmitAddress = (e) => {
    e.preventDefault();

    const newStore = new FormData();
    newStore.append("logo", file);
    newStore.append("title", Form.title);
    newStore.append("bio", Form.bio);
    console.log(newStore);
    dispatch(updateStore(newStore));
    setForm({
      ...Form,
      title: store?.title,
      bio: store?.bio,
    });
  };
  useEffect(() => {
    if (store) {
      setForm({
        title: store.title,
        bio: store.bio,
      });
      setUrlLogo(store.logo);
    }
  }, [store]);
  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        className="fixed  inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="bg-black min-h-screen px-4 text-center  bg-secondary-dark bg-opacity-50">
          <Dialog.Overlay className="fixed inset-0" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className=" bg-white inline-block w-[50%]  p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-secondary shadow-xl rounded-2xl font-roboto">
            <Dialog.Title as="h3" className="text-primary font-bold text-2xl">
              personalize your store
            </Dialog.Title>

            <div className="mt-4">
              <form onSubmit={(e) => onSubmitAddress(e)} className="w-full">
                <div className="flex flex-row">
                  <div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label
                          htmlFor=""
                          className="text-xs font-semibold px-1"
                        >
                          Title
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            onChange={(e) => onInputChange(e)}
                            value={Form.title}
                            type="text"
                            name="title"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="store Name "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label
                          htmlFor=""
                          className="text-xs font-semibold px-1"
                        >
                          Bio
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            onChange={(e) => onInputChange(e)}
                            value={Form.bio}
                            type="text"
                            name="bio"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="bio"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" w-96 h-96 md:w-48 md:h-48  sm:w-24 sm:h-24 relative">
                    <img
                      src={urlLogo}
                      alt="..."
                      className="shadow rounded-full object-cover  w-full h-full border-none "
                    />

                    <label
                      htmlFor="image"
                      className=" absolute bottom-10   left-[calc(50%-35px) flex flex-col items-center bg-info rounded-md text-white  py-1  w-[25%]"
                    >
                      <p className="text-xs sm:truncate sm:w-0 sm:h-0">
                        {" "}
                        Upload image
                      </p>
                      <i className="fa-solid fa-upload"></i>
                    </label>

                    <input
                      hidden
                      type="file"
                      name="image"
                      id="image"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setUrlLogo(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      type="submit"
                      onClick={closeModal}
                      className="block w-full max-w-xs mx-auto bg-info hover:bg-Primary focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      Update NOW
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Store;

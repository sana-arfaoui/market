import React, { Fragment, useEffect, useState } from "react";
import { Menu, Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Actions/auth.action";
import { setStore } from "../../utils/setStore";
import Spinner from "../Spinner";
import Login from "../../pages/Authentication/Login";
import { getMyProfile } from "../../redux/Actions/profile.action";
import { getStore } from "../../redux/Actions/store.action";

const Header = () => {
  setStore(localStorage.store);

  const { store } = useSelector((state) => {
    return state.storeReducers;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getStore());
    }, 1);
    return () => clearTimeout(timer);
  }, []);

  const dispatch = useDispatch();
  const [Query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const goToSearch = (e) => {
    // const queries = new URLSearchParams(location.search);

    let queryString = "";
    const regex = /q=.*$/i;
    if (location.search.search("q=") !== -1) {
      queryString = location.search.replace(regex, `q=${Query}`);
    } else {
      queryString += location.search ? location.search : "?" + `&q=${Query}`;
    }

    navigate(`/search${queryString}`);
  };

  const { isLoading, isAuthenticated, user } = useSelector((state) => {
    return state.authReducers;
  });

  const closeToast = () =>
    toast("connect to you account before", { autoClose: 500 });

  const { items } = useSelector((state) => state.cartReducers);

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);


  const number = () => {
    let countItem = 0;
    items?.map((product) => (countItem = countItem + product.quantity));
    return countItem;
  };
  const { profile } = useSelector((state) => {
    return state.profileReducers;
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <header className="shadow-s font-Roboto  bg-Primary w-full  fixed  z-50 px-10">
      <div className="flex items-center justify-between h-16 max-w-screen-xl  mx-auto">
        <div className="flex-1 w-0 lg:flex hidden">
          {(isAuthenticated && user?.role === "merchant") ||
          !isAuthenticated ? (
            <button
              type="button"
              onClick={(e) => {
                openModal(e);
                dispatch(logout());
              }}
              className="px-5 py-2 text-sm font-medium text-info  bg-white rounded-full"
            >
              <i className="fa-solid fa-user pl-1"></i>
            </button>
          ) : (
            <div className="flex items-center">
              <div className=" text-right z-[9999]">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium   bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>

                      <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 left-0 w-28 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`${
                                active ? "bg-info text-white" : "text-info"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <i className="fa-solid fa-user  pr-2"></i>
                              ) : (
                                <i className="fa-solid fa-user text-info  pr-2"></i>
                              )}
                              profile
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1 border-gray">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/cart"
                              className={`${
                                active ? "bg-info text-white" : "text-info"
                              } group flex rounded-md items-center w-full py-2 text-sm`}
                            >
                              {active ? (
                                <i className="fa-solid fa-cart-shopping pl-1"></i>
                              ) : (
                                <i className="fa-solid fa-cart-shopping pl-1"></i>
                              )}
                              <div className="relative pl-2 ">
                                <div className=" text-xs absolute w-4 h-4  rounded-full text-danger flex items-center justify-center  left-9 bottom-2 font-black		">
                                  {number()}
                                </div>
                                <div>cart</div>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>

                      <div className="px-1 py-1 border-gray">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => dispatch(logout())}
                              className={`${
                                active ? "bg-info text-white" : "text-info"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <i className="fa-solid fa-right-from-bracket pr-2"></i>
                              ) : (
                                <i className="fa-solid fa-person-walking-arrow-right pr-2 text-info"></i>
                              )}
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to={`/home/${localStorage.store}`}
            className="w-12 h-12 rounded-lg"
          >
            <img
              src={store?.logo}
              alt="logoStore"
              className="rounded-full object-cover  w-full h-full"
            />
          </Link>

          <form className="flex mb-0 lg:hidden ">
            <div className="relative">
              <input
                className="h-10 pr-10 text-sm placeholder-gray-300 border-gray-200 rounded-md focus:z-10"
                placeholder="Search..."
                type="search"
                onChange={(e) => setQuery(e.target.value)}
                value={Query}
              />
              {/**make samthig in senter top-[calc(50%-14px)] */}
              <button
                className="absolute inset-y-0 right-0 p-2 mr-px text-gray-600 rounded-r-md"
                type="submit"
                onClick={(e) => goToSearch(e)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
        {/* serch icon */}
        <div className="hidden justify-end flex-1 w-0 lg:flex">
          <NavLink
            to="/search"
            className="p-2 text-gray-500 bg-gray-100 rounded-full"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                fillRule="evenodd"
              ></path>
            </svg>
          </NavLink>
        </div>

        <nav className="items-center justify-center lg:hidden space-x-8 text-sm font-medium flex flex-1 w-0">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white " : "text-black"
            }
            to={`/home/${localStorage.store}`}
          >
            Home
            <hr
              className={({ isActive }) =>
                isActive ? "bg-white h-40 " : "hidden"
              }
            />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white " : "text-black"
            }
            to={`/search`}
          >
            Products
            <hr
              className={({ isActive }) =>
                isActive ? "bg-white h-40 " : "hidden"
              }
            />
          </NavLink>
          <Link className="text-gray-900 text-black" to="#">
            About
          </Link>
          <Link className="text-gray-900 text-black" to="#">
            Contact
          </Link>
        </nav>

        <div className="items-center lg:hidden space-x-4 flex">
          {isAuthenticated ? (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "relative text-white  hover:text-gray-500 border border-transparent focus-within:border-white border-solid"
                  : "relative text-black  hover:text-gray-500 border border-transparent focus-within:border-white border-solid"
              }
              to="/cart"
            >
              <div className=" text-xs absolute w-4 h-4 bg-white rounded-full text-danger flex items-center justify-center  left-10 bottom-4 font-black		">
                {number()}
              </div>
              cart
              <i className="fa-solid fa-cart-shopping pl-1"></i>
            </NavLink>
          ) : (
            <div>
              <button
                onClick={closeToast}
                className="relative hover:text-gray-500 border border-transparent focus-within:border-white border-solid"
              >
                cart
                <i className="fa-solid fa-cart-shopping pl-1"></i>
              </button>
              <ToastContainer autoClose={1000} />
            </div>
          )}

          {(isAuthenticated && user?.role === "merchant") ||
          !isAuthenticated ? (
            <button
              type="button"
              onClick={(e) => {
                openModal(e);
                dispatch(logout());
              }}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-infoDark"
            >
              connect
              <i className="fa-solid fa-user pl-1"></i>
            </button>
          ) : (
            <div className="flex items-center">
              <div className=" text-right z-[9999]">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium   bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {user?.firstName} {user?.lastName}
                      <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`${
                                active ? "bg-info text-white" : "text-info"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <i className="fa-solid fa-user  pr-2"></i>
                              ) : (
                                <i className="fa-solid fa-user text-info  pr-2"></i>
                              )}
                              profile
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1 border-gray">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-white"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <ArchiveActiveIcon
                                  className="w-5 h-5 mr-2"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ArchiveInactiveIcon
                                  className="w-5 h-5 mr-2"
                                  aria-hidden="true"
                                />
                              )}
                              Archive
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1 border-gray">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => dispatch(logout())}
                              className={`${
                                active ? "bg-info text-white" : "text-info"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <i className="fa-solid fa-right-from-bracket pr-2"></i>
                              ) : (
                                <i className="fa-solid fa-person-walking-arrow-right pr-2 text-info"></i>
                              )}
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <Link to="/profile" className=" w-14 h-14 sm:w-10 sm:h-10">
                <img
                  className="rounded-full object-cover  w-full h-full"
                  src={profile?.avatar}
                  alt="avatar"
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 hidden lg:flex ">
        <nav className="flex items-center justify-center p-4 overflow-x-auto text-sm font-medium mx-auto gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white " : "text-black"
            }
            to={`/home/${localStorage.store}`}
          >
            Home
            <hr
              className={({ isActive }) =>
                isActive ? "bg-white h-40 " : "hidden"
              }
            />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white " : "text-black"
            }
            to={`/search`}
          >
            Products
            <hr className="bg-white" />
          </NavLink>
          <Link className="text-gray-900 text-black" to="#">
            About
          </Link>
          <Link className="text-gray-900 text-black" to="#">
            Contact
          </Link>
        </nav>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[999] overflow-y-auto "
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black  bg-opacity-50" />
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
              <div className=" inline-block   py-5 px-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-2xl font-medium mb-5">
                  Login
                </Dialog.Title>
                <Login />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
};

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

export default Header;

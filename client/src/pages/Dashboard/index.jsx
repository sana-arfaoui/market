import React, { useState, Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import order from "../../assets/icon/order.svg";
import product from "../../assets/icon/product.svg";
import addProductIcon from "../../assets/icon/add.png";
import admin from "../../assets/icon/admin.png";
import goTo from "../../assets/icon/goto.svg";
import pendingOrder from "../../assets/icon/orderPending.svg";

import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Spinner from "../../shared/Spinner";
import { logout } from "../../redux/Actions/auth.action";
import { getCategories } from "../../redux/Actions/category.action";
import { getMyStore } from "../../redux/Actions/store.action";
import Store from "./components/Store";
import { merchantOrders } from "../../redux/Actions/order.action";

const Dashboard = () => {
  const { isLoading, isAuthenticated, user } = useSelector((state) => {
    return state.authReducers;
  });
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getMyStore(/**{ store: user.store } */));
  }, []);
  const { store } = useSelector((state) => {
    return state.storeReducers;
  });
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(merchantOrders({ status: "pending" }));
  }, [isAuthenticated]);
  const { orders } = useSelector((state) => state.orderReducers);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex flex-row w-full font-sans 	h-screen mb-10">
      <Store isOpen={isOpen} closeModal={() => setIsOpen(false)} />

      <aside className="bg-Primary fixed  min-h-screen h-full overflow-y-auto  w-1/6 text-white font-medium">
        <i className="fa-solid fa-align-right pt-5 flex justify-end pr-2  text-lg lg:text-sm  "></i>
        <div className=" flex justify-center items-center">
          <button
            onClick={() => setIsOpen(true)}
            className=" w-16 h-16 rounded-lg"
          >
            <img
              className="rounded-full object-cover  w-full h-full"
              src={store?.logo}
              alt="logoStore"
            />
          </button>
          <p className="text-white text-lg lg:text-sm pl-5">{store?.title}</p>
        </div>
        <div className="max-w-[90%] ml-16   pt-10 lg:ml-0">
          <h2 className="text-lg font-semibold tracking-widest text-[#a9e1f9]		">
            OPERATION
          </h2>
          <ul className="pl-2 pt-5">
            <div className="flex flex-row gap-3 ">
              <i className="fa-solid fa-house"></i>
              <li className="mb-3">Home</li>
            </div>
            <Link to="/dashboard/customer" className="flex flex-row gap-3 mt-1">
              <i className="fa-solid fa-user-group"></i>
              <li className="mb-3">customer</li>
            </Link>
            <Link to="/dashboard/order" className="flex flex-row gap-3 mt-1">
              <img className="max-w-[1.3rem]" src={order} alt="order" />
              <li>Orders</li>
            </Link>
          </ul>
          <h2 className="mt-7 text-lg font-semibold tracking-widest text-[#a9e1f9]">
            SETUP
          </h2>
          <ul className="pl-2 pt-5">
            <Link to="/dashboard/product" className="flex flex-row gap-3 ">
              <img className="max-w-[1.3rem]" src={product} alt="product" />
              <li className="mb-3">Products</li>
            </Link>
            <Link
              to="/dashboard/addProduct"
              className="flex flex-row gap-3 mt-1 "
            >
              <img
                className="max-w-[1.3rem] max-h-[1.5rem]"
                src={addProductIcon}
                alt="addProductIcon"
              />
              <li className="mb-3">Add Product</li>
            </Link>
            <Link to="/dashboard/category" className="flex flex-row gap-3 mt-1">
              <i className="fa-solid fa-cart-flatbed"></i>
              <li>Categories</li>
            </Link>
          </ul>
        </div>

        <Link to="#" className="flex flex-row gap-3 ml-[4.57rem] lg:ml-2 mt-32">
          <img
            className="max-w-[1.3rem] max-h-[1.3rem]"
            src={admin}
            alt="addProduct"
          />
          <p>contact admin</p>
        </Link>
      </aside>
      <section className="w-5/6 pt-10 ml-[17rem] pb-16 lg:ml-44">
        <div className="  bg-white shadow-md rounded-xl	 w-[90%] m-auto min-h-max flex flex-row justify-between items-center px-5 py-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <Link to={`/home/${store?._id}`} className="min-w-min lg:text-sm">
              go to my website
            </Link>
            <img src={goTo} alt="go to" />
          </div>
          <div className="flex flex-row items-center justify-center gap-7">
            <div className="flex flex-row items-center gap-3">
              <p>order </p>
              <Link to="/dashboard/order" className="relative">
                <p className="absolute left-5 bottom-8 rounded-full bg-Primary text-white w-5 h-5 flex items-center justify-center sm:text-[1rem]">
                  {orders.length}
                </p>
                <img
                  className="max-w-[1.97rem]"
                  src={pendingOrder}
                  alt="pending Order"
                />
              </Link>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className=" text-right z-[9999]">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium   bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {user.firstName} {user.lastName}
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
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard/my_info"
                              className={`${
                                active ? "bg-info text-white" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <EditActiveIcon
                                  className="w-5 h-5 mr-2"
                                  aria-hidden="true"
                                />
                              ) : (
                                <EditInactiveIcon
                                  className="w-5 h-5 mr-2"
                                  aria-hidden="true"
                                />
                              )}
                              Edit
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
                                  : "text-gray-900"
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
                                active ? "bg-info text-white" : "text-gray-900"
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

              <Link
                to="/dashboard/my_info"
                className=" w-14 h-14 sm:w-10 sm:h-10"
              >
                <img
                  className="object-cover  w-full h-full  rounded-full"
                  src={user.profile?.avatar}
                  alt="avatar"
                />
              </Link>
            </div>
          </div>
        </div>

        
        <Outlet />
      </section>
    </div>
  );
};
function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#05A7FF"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

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

export default Dashboard;

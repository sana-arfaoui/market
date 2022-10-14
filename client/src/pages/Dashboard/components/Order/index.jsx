import React from "react";
import { Tab } from "@headlessui/react";
import OrderItem from "../../../../shared/OrderItem";
import { merchantOrders } from "../../../../redux/Actions/order.action";
import { useDispatch } from "react-redux";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Order = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full  px-2 py-16 sm:px-0 mx-auto font-Roboto ">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-info p-1 w-full">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg  text-sm font-medium leading-5 text-blue-700",
                "ring-white  ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            <button
              className="w-full h-full"
              type="button"
              onClick={() => {
                dispatch(merchantOrders({ status: "pending" }));
              }}
            >
              Pending orders
            </button>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg  py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            <button
              className="w-full h-full"
              type="button"
              onClick={() => {
                dispatch(merchantOrders());
              }}
            >
              all orders
            </button>
          </Tab>

          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg  text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            <button
              className="w-full h-full"
              type="button"
              onClick={() => {
                dispatch(merchantOrders({ status: "confirmed" }));
              }}
            >
              confirmed orders
            </button>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg  text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            <button
              className="w-full h-full"
              type="button"
              onClick={() => {
                dispatch(merchantOrders({ status: "fulfilled" }));
              }}
            >
              delivered orders
            </button>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg  text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            <button
              className="w-full h-full"
              type="button"
              onClick={() => {
                dispatch(merchantOrders({ status: "canceled" }));
              }}
            >
              canceled orders
            </button>
          </Tab>
        </Tab.List>
        <Tab.Panels className=" w-full mt-2">
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2  focus:outline-none "
            )}
          >
            <OrderItem />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2  focus:outline-none "
            )}
          >
            <OrderItem />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2  focus:outline-none "
            )}
          >
            <OrderItem />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2  focus:outline-none "
            )}
          >
            <OrderItem />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2  focus:outline-none "
            )}
          >
            <OrderItem />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Order;

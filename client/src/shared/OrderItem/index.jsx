import React, { Fragment, useState } from "react";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { parseISO, format } from "date-fns";
import Spinner from "../Spinner";
import { useSelector, useDispatch } from "react-redux";
import OrderAction from "./OrderAction";
import { merchantOrders } from "../../redux/Actions/order.action";
const OrderItem = () => {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [IdOrder, setIdOrder] = useState(null);

  const { orders, isLoading } = useSelector((state) => state.orderReducers);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="">
      <OrderAction
        isOpen={isOpen}
        closeModal={() => {
          dispatch(merchantOrders());
          setIsOpen(false);
          dispatch(merchantOrders());
        }}
        id={IdOrder}
      />
      <table className=" w-full m-auto bg-white">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>address</th>
            <th>date of order</th>
            <th>update date</th>
            <th>prix total</th>
            <th>prix total with tax</th>
            <th>tax Percentage</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody className="">
          {orders.orders?.length > 0 ? (
            orders.orders.map((order) => (
              <Disclosure>
                {({ open }) => (
                  <Fragment>
                    <tr className="border-gray border-t">
                      <td className="text-slate-500 hover:text-black">
                        {order._id}
                      </td>
                      <td>
                        {order.customer?.lastName} {order.customer?.firstName}
                      </td>
                      <td className="grid grid-cols-1 gap-2 justify-center">
                        <div>
                          {order.address.country},{order.address.city}
                        </div>
                        <div>
                          {order.address.street},{order.address.zipCode}
                        </div>
                      </td>
                      <td> {format(parseISO(order.createdAt), "P")}</td>
                      <td>{format(parseISO(order.updatedAt), "P")}</td>
                      <td>{order.totalPrice} TND</td>
                      <td>{order.totalPriceWithTax} TND</td>
                      <td>{order.taxPercentage} </td>
                      <td>
                        <div
                          className="cursor-pointer focus:animate-ping	font-medium	 select-none border py-1.5 rounded-md transition	duration-300		 	hover:scale-95 "
                          onClick={() => {
                            setIsOpen(true);
                            setIdOrder(order._id);
                          }}
                        >
                          {order.status === "pending" ? (
                            <div className="text-Warning ">{order.status}</div>
                          ) : order.status === "canceled" ? (
                            <div className="text-danger">{order.status}</div>
                          ) : order.status === "confirmed" ? (
                            <div className="text-[#3A5BFF]">{order.status}</div>
                          ) : (
                            <div className="text-Success">{order.status}</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-info`}
                          />
                        </Disclosure.Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={10}>
                        <Disclosure.Panel className=" ">
                          {order.items.length > 0 &&
                            order.items.map((product) => {
                              return (
                                <div className="font-medium  grid grid-cols-4 md:grid-cols-7 mx-auto max-w-2xl text-left			pl-10 leading-8	">
                                  <div className="">
                                    product:
                                    <span className="text-info">
                                      {product.product?.title}
                                    </span>
                                  </div>
                                  <div className=" ">
                                    price:
                                    <span className="text-info">
                                      {product.price} TND
                                    </span>
                                  </div>
                                  <div className="">
                                    quantity:
                                    <span className="text-info">
                                      {product.quantity}
                                    </span>
                                  </div>
                                  <div className=" ">
                                    total:
                                    <span className="text-info">
                                      {product.total} TND
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                        </Disclosure.Panel>
                      </td>
                    </tr>
                  </Fragment>
                )}
              </Disclosure>
            ))
          ) : (
            <tr className=" flex  flex-row justify-center">
              <td colSpan="10">No order</td>{" "}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItem;

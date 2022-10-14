import React, {useEffect } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerByCarts } from "../../../../redux/Actions/cart.action";

const Customer = () => {
 // let [countCustomer, setCountCustomer] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerByCarts());
  }, []);
  const { carts } = useSelector((state) => {
    return state.cartReducers;
  });

  return (
    <div className="pt-10">
      <div className="font-semibold"> customer </div>
      <section>
        <table className=" w-[80%] m-auto">
          <thead className="pb-20">
            <tr>
              <th>Customer Name </th>
              <th>Address</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody className=" ">
            {carts.length > 0 &&
              carts.map((customer) => {
                if (customer.carts.length > 0) {
                  return (
                    <Fragment>
                      <tr className=" bg-white transition  ease-in-out duration-500 hover:rounded-lg hover:scale-[1.02]  hover:border-b-2	 border-b-2 border-gray border-style:solid rounded-lg ">
                        <td className="flex flex-row justify-start	 items-center gap-1">
                          <div className=" w-14 h-14 sm:w-10 sm:h-10">
                            <img
                              className="rounded-full object-cover  w-full h-full"
                              src={customer?.profile.avatar}
                              alt="customerAvatar"
                            />
                          </div>
                          <div>
                            {customer?.firstName}
                            <pre></pre>
                            {customer?.lastName}
                          </div>
                        </td>
                        <td>
                          <div>
                            {customer.address.country},{customer.address.city}
                          </div>
                          <div>
                            {customer.address.street},{customer.address.zipCode}
                          </div>
                        </td>
                        <td>+216 {customer.number}</td>
                      </tr>
                    </Fragment>
                  );
                } else {
                  <div></div>;
                }
              })}
          
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Customer;

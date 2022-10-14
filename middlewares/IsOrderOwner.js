const Order = require("../models/order.models");
module.exports.isOrderOwner = async (req, res, next) => {
  const id = req.order._id;
  const order = await Order.findById(id);
  const currentUser = req.verifiedUser._id;
  if (
    order.customer.toString() === currentUser ||
    order.store.toString() === currentUser
  ) {
    next();
  } else {
    res.status(403).json("you dent have any order with this id");
  }
};

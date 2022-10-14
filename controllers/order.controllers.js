const Order = require("../models/order.models");
const Cart = require("../models/cart.models");

const createOrder = async (req, res) => {
  const cart = await Cart.findOne({
    $and: [{ store: req.store._id }, { customer: req.verifiedUser._id }],
  });
  const newOrder = new Order({
    items: cart.items,
    totalPrice: cart.totalPrice,
    totalPriceWithTax: cart.totalPriceWithTax,
    taxPercentage: cart.taxPercentage,

    address: req.verifiedUser.address,
    customer: req.verifiedUser._id,
    store: req.store._id,
  });

  try {
    const savedOrder = await newOrder.save();
    cart.items = [];
    cart.totalPrice = 0;
    cart.totalPriceWithTax = 0;
    await cart.save();

    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOrder = async (req, res) => {
  const id = req.order._id;
  try {
    const getOrder = await Order.findById(id);
    return res.status(200).json(getOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getMYOrder = async (req, res) => {
  const id = req.order._id;

  try {
    const order = await Order.findById(id);

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const meOrders = async (req, res) => {
  const currentUser = req.verifiedUser._id;
  try {
    const order = await Order.find({ customer: currentUser })
      .populate("address")
      .populate({ path: "store", select: "title" })
      .populate({
        path: "items.product",
        select: "reference image title slug description countInStock",
      })
      .sort({ createdAt: -1 });
    const count = await Order.find({ customer: currentUser }).countDocuments();
    if (count === 0) {
      return res
        .status(200)
        .json({ length: count, message: "no order for you" });
    }

    return res.status(200).json({
      length: count,
      orders: order,
    });
  } catch (err) {
    return res.status(500).json();
  }
};

const merchantOrders = async (req, res) => {
  const currentUserStore = req.verifiedUser.store;
  const status = req.query.status;
  try {
    if (status) {
      const order = await Order.find({
        status: status,
        store: currentUserStore,
      })
        .populate("address")
        .populate({ path: "customer", select: "firstName lastName number" })
        .populate({
          path: "items.product",
          select: "reference image title slug description countInStock",
        })
        .sort({ createdAt: -1 });
      const count = await Order.find({
        status: status,
        store: currentUserStore,
      }).countDocuments();
      if (count === 0) {
        return res
          .status(200)
          .json({ length: count, message: "no order for you" });
      }

      return res.status(200).json({
        length: count,
        orders: order,
      });
    }

    const order = await Order.find({ store: currentUserStore })
      .populate("address")
      .populate({ path: "customer", select: "firstName lastName number" })
      .populate({
        path: "items.product",
        select: "reference image title slug description countInStock",
      })
      .sort({ createdAt: -1 });
    const count = await Order.find({
      store: currentUserStore,
    }).countDocuments();
    if (count === 0) {
      return res
        .status(401)
        .json({ length: count, message: "no order for you" });
    }

    return res.status(200).json({
      length: count,
      orders: order,
    });
  } catch (err) {
    return res.status(500).json();
  }
};
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const orderLength = orders.length;
    return res.status(200).json({ length: `${orderLength}`, order: orders });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const canceled = async (req, res) => {
  const OrderId = req.order._id;

  try {
    const canceledOrder = await Order.findByIdAndUpdate(
      OrderId,
      { status: "canceled" },
      { new: true }
    );
    return res.status(200).json({ message: "Successfully cancelled" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const confirmed = async (req, res) => {
  const orderId = req.order._id;
  try {
    const confirmed = await Order.findByIdAndUpdate(
      orderId,
      { status: "confirmed" },
      { new: true }
    );
    return res.status(200).json({ message: "Successfully confirmed" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const fulfilled = async (req, res) => {
  const orderId = req.order._id;
  try {
    await Order.findByIdAndUpdate(
      orderId,
      { status: "fulfilled" },
      { new: true }
    );
    return res.status(200).json({ message: "Successfully fulfilled" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createOrder = createOrder;
module.exports.getOrder = getOrder;
module.exports.getOrders = getOrders;
module.exports.meOrders = meOrders;
module.exports.merchantOrders = merchantOrders;
module.exports.canceled = canceled;
module.exports.confirmed = confirmed;
module.exports.fulfilled = fulfilled;
module.exports.getMYOrder = getMYOrder;

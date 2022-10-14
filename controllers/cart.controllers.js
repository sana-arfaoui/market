const mongoose = require("mongoose");
const Cart = require("../models/cart.models");
const User = require("../models/user.models");

const getOwnedCart = async (req, res) => {
  const currentUser = req.verifiedUser._id;
  const store = req.store._id;
  try {
    const cart = await Cart.findOne({
      $and: [{ store: store }, { customer: currentUser }],
    }).populate({
      path: "items.product",
      select: "reference image title slug description countInStock",
    });

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const emptyCart = async (req, res) => {
  const currentUser = req.verifiedUser._id;
  const store = req.store._id;
  try {
    const cart = await Cart.findOne({
      $and: [{ store: store }, { customer: currentUser }],
    });
    cart.items = [];
    cart.totalPrice = 0;
    cart.totalPriceWithTax = 0;
    const savedCart = await cart.save();
    return res.status(200).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addItemToCart = async (req, res) => {
  // const cartId = req.verifiedUser.cart;
  const currentUser = req.verifiedUser._id;
  const store = req.store._id;
  const alreadyExistCart = await Cart.findOne({
    $and: [{ store: store }, { customer: currentUser }],
  });

  console.log("not exist cart create new  now", alreadyExistCart);
  /* This is a check to see if the user has a cart. If they don't, it creates a new cart for them. */
  if (!alreadyExistCart) {
    const newCart = new Cart({
      store: store,
      customer: currentUser,
    });
    /* const savedCard =*/ await newCart.save();
  }

  const item = {
    ...req.body.item,
    total: req.body.item.price * req.body.item.quantity,
  };
  try {
    const cart = await Cart.findOne({
      $and: [{ store: store }, { customer: currentUser }],
    });

    const itemIndex = cart.items
      .map((itemElement) => itemElement.product.toString())
      .indexOf(item.product);
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity =
        cart.items[itemIndex].quantity + item.quantity;
      cart.items[itemIndex].total =
        cart.items[itemIndex].quantity * cart.items[itemIndex].price;
    } else {
      cart.items.push(item);
    }
    const savedCart = await cart.save();
    return res.status(201).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const removeItemFromCart = async (req, res) => {
  const currentUser = req.verifiedUser._id;
  const store = req.store._id;
  try {
    const cart = await Cart.findOne({
      $and: [{ store: store }, { customer: currentUser }],
    });
    const items = cart.items.filter(
      (item) => item.product.toString() !== req.body.item
    );
    cart.items = items;

    const savedCart = await cart.save();
    return res.status(201).json({ message: "product delete Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getMyCarts = async (req, res) => {
  const currentUser = req.verifiedUser._id;

  try {
    const count = await Cart.find({ customer: currentUser }).countDocuments();
    const cart = await Cart.find({ customer: currentUser })
    .populate("store");
    return res.status(200).json({
      length: count,
      carts: cart,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getCustomer = async (req, res) => {
  const storeId = mongoose.Types.ObjectId(req.verifiedUser.store);
  console.log(storeId);
  try {
    const customer = await User.aggregate([
      { $match: { role: "customer" } },
      {
        $lookup: {
          let: {
            userId: "$_id",
          },
          from: "carts",
          as: "carts",
          pipeline: [
            {
              $match: {
                $and: [
                  { $expr: { $eq: ["$customer", "$$userId"] } },
                  { $expr: { $eq: ["$store", storeId] } },
                ],
              },
            },
          ],
        },
      },
    ]).sort({ createdAt: -1 });

    // console.log(customer.map((cart) => cart.carts.length > 0));
    await User.populate(customer, {
      path: "profile",
      select: "avatar ",
    });
    await User.populate(customer, { path: "address" });
    return res.status(200).json(customer);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getOwnedCart = getOwnedCart;

module.exports.emptyCart = emptyCart;
module.exports.getMyCarts = getMyCarts;
// module.exports.getCustomerByCarts = getCustomerByCarts;
module.exports.getCustomer = getCustomer;
module.exports.addItemToCart = addItemToCart;
module.exports.removeItemFromCart = removeItemFromCart;

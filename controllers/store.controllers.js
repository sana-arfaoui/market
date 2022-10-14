const Store = require("../models/store.models");
const mongoose = require("mongoose");
const getMyStore = async (req, res) => {
  const StoreId = req.verifiedUser.store;

  try {
    const store = await Store.findById(StoreId);
    return res.status(200).json(store);

    //  await Product.populate(product, { path: "category", select: "title" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getStore = async (req, res) => {
  const StoreId = req.store._id;

  try {
    const store = await Store.findById(StoreId);
    return res.status(200).json(store);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getStores = async (req, res) => {
  try {
    const store = await Store.find();
    return res.status(200).json(store);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateStore = async (req, res) => {
  const host = process.env.HOST;
  const port = process.env.PORT;
  const user = req.verifiedUser.store;
  // console.log(req.body)
  try {
    const updateStore = await Store.findByIdAndUpdate(
      user,
      {
        logo: `${host}:${port}/images/${req.file.filename}`,
        bio: req.body.bio,
        title: req.body.title,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updateStore);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getMyStore = getMyStore;
module.exports.getStores = getStores;
module.exports.getStore = getStore;
module.exports.updateStore = updateStore;

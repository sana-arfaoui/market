const Store = require("../models/store.models");
module.exports = async (req, res, next) => {
  const storeId = req.header("access_store");
  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(401).json("not found store");
    } else {
      req.store = store;
      next();
    }
  } catch (err) {
    return res.status(403).json(err);
  }
};

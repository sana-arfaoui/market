const {
  canceled,
  confirmed,
  fulfilled,
  createOrder,
  getOrder,
  getOrders,
  meOrders,
  getMYOrder,
  merchantOrders,
} = require("../controllers/order.controllers");
const {
  verifyToken,
  isMerchant,
  isCustomer,
  verifyStore,
  isOrderOwner,
  isAdmin,
} = require("../middlewares");
const Order = require("../models/order.models");

const router = require("express").Router();

//params Order
router.param("order", async (req, res, next, id) => {
  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json("not found order");
    } else {
      req.order = order;
      next();
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/canceled/:order", verifyToken, isMerchant, canceled);
router.get("/confirmed/:order", verifyToken, isMerchant, confirmed);
router.get("/fulfilled/:order", verifyToken, isMerchant, fulfilled);

router.get("/me", verifyToken, isCustomer, meOrders);
router.get("/merchantOrders", verifyToken, isMerchant, merchantOrders);
router.get("/checkout", verifyToken, verifyStore, isCustomer, createOrder);

router.get(
  "/getMYOrder/:order",
  verifyToken,
  isCustomer,
  isOrderOwner,
  getMYOrder
);
router.get(
  "/merchantOrder/:order",
  verifyToken,
  isMerchant,
  isOrderOwner,
  getMYOrder
);
router.get("/:order", verifyToken, isAdmin, getOrder);
router.get("/", verifyToken, isAdmin, getOrders);

module.exports = router;

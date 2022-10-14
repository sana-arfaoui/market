const express = require("express");
const {
  createAddress,
  getAddress,
  getAddresses,
  updateMyAddress,
  deleteAddress,
  meAddresses,
} = require("../controllers/address.controllers");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();
router.get("/me", verifyToken, meAddresses);
router.post("/", verifyToken, createAddress);
router.get("/:addressId", verifyToken, getAddress);
router.get("/", verifyToken, getAddresses);
router.put("/update", verifyToken, updateMyAddress);
router.delete("/:addressId", verifyToken, deleteAddress);

module.exports = router;

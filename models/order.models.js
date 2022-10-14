const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    //item dinormalize
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        price: { type: Number, min: 0 },
        quantity: { type: Number, min: 0 },
        total: { type: Number, min: 0 },
      },
    ],
    totalPrice: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ["canceled", "pending", "confirmed", "fulfilled"],
      default: "pending",
    },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    totalPriceWithTax: { type: Number, min: 0 },
    taxPercentage: { type: Number, min: 0, default: 19 },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

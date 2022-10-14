const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);

const mongoose = require("mongoose");
const WishlistSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isLiked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Wishlist", WishlistSchema);

const mongoose = require("mongoose");
const TokenMailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    tokenMail: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TokenMail", TokenMailSchema);

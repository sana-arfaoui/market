const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    title: { type: String },
    logo: { type: String },
    social: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Store", StoreSchema);

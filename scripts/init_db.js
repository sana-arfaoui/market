//import section
const bcrypt = require("bcryptjs");
// const axios = require("axios");
const Admin = require("../models/admin.models");
// const Category = require("../models/category.models");
// const Product = require("../models/product.models");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dukkan");
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose failed with", err);
});
async function initAdmin() {
  const salt = await bcrypt.genSalt(16);
  const hashedPassword = await bcrypt.hash("26236286", salt);
  const newAdmin = new Admin({
    firstName: "montassar",
    lastName: "themri",
    email: "montassar@gmail.com",
    password: hashedPassword,
  });

  await newAdmin.save();
}

try {
  const init = async () => {
    await initAdmin();
    // await initCategories();
    // await initProducts();
    console.log("Done!");
  };
  init();
} catch (err) {
  console.log(err);
}

require("dotenv").config();
//import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
//db connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
  console.log("DB connect");
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose failed with", err);
});
//import routes
const adminRouter = require("./auth/admin.routes");
const authRouter = require("./auth/auth.routes");
const productRoute = require("./routes/product.routes");
const storeRouter = require("./routes/store.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");
const addressRouter = require("./routes/address.routes");
const profileRouter = require("./routes/profile.routes");
//middelware
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(compression()); //reduire taile for operations
//routes middleware
app.use("/images", express.static("./uploads"));
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRoute);
app.use("/api/store", storeRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/address", addressRouter);
app.use("/api/profile", profileRouter);

//listen server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server in running on http:/localhost:${port}`);
});

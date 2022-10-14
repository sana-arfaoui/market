const {
  createCategory,
  updateCategory,
  getCategory,
  getCategories,
  deleteCategory,
  getMyCategories,
  getAllCategories,
} = require("../controllers/category.controllers");
const {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/product.controllers");
const {
  addReview,
  updateReview,
  getReviewByproduct,
} = require("../controllers/productReview.controllers");
const {
  isMerchant,
  isCustomer,
  verifyToken,
  isReviewOwner,
  verifyStore,
} = require("../middlewares");
const Category = require("../models/category.models");
const Product = require("../models/product.models");
const Review = require("../models/productReview.models");
const Store = require("../models/store.models");
const router = require("express").Router();
//   const  = require("../middlewares/verifyToken");

//param
//param product
router.param("product", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json("not found product");
    } else {
      req.product = product;
      next();
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//param category
router.param("category", async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json("not found category");
    } else {
      req.category = category;
      next();
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
//param  review
router.param("review", async (req, res, next, id) => {
  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json("not found review");
    } else {
      req.review = review;
      next();
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

const multer = require("multer");
const path = require("path");
const {
  addToWishlist,
  getMyWishlist,
} = require("../controllers/wishlist.controllers");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 500000,
  // },
});

//product routes
router.post(
  "/product",
  verifyToken,
  isMerchant,
  upload.single("image"),
  createProduct
);
router.put(
  "/:product/update",
  verifyToken,
  isMerchant,
  upload.single("image"),
  updateProduct
);
router.get("/product/:productSlug", getProduct);

router.get("/me", verifyToken, getProducts);
router.get("/", verifyStore, getProducts);
router.delete("/:product", verifyToken, isMerchant, deleteProduct);

//category routes
router.post(
  "/category",
  verifyToken,
  isMerchant,
  upload.single("image"),
  createCategory
);
router.put("/category/:category", verifyToken, isMerchant, updateCategory);
router.get("/category/:categorySlug", verifyToken, getCategory);
router.get("/get_categories_By_store", verifyStore, getCategories);
router.get("/me_categories", verifyToken, getCategories);
router.get("/all_categories", getAllCategories);
router.delete("/category/:category", verifyToken, isMerchant, deleteCategory);
//review routes
router.post("/:product/review", verifyToken, isCustomer, addReview);
router.put("/review/:review", verifyToken, isReviewOwner, updateReview);
//wishlist
router.get("/:product/wishlist", verifyToken, isCustomer, addToWishlist);
router.get("/wishlist", verifyToken, isCustomer, getMyWishlist);

module.exports = router;

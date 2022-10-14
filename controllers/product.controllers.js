const Category = require("../models/category.models");
const Product = require("../models/product.models");

const createProduct = async (req, res) => {
  const host = process.env.HOST;
  const port = process.env.PORT;
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    user: req.verifiedUser._id,
    image: `${host}:${port}/images/${req.file.filename}`,
    //  promotionPrice:req.body.promotionPrice,
    reference: req.body.reference,
    isPromotion: req.body.isPromotion,
    countInStock: req.body.countInStock,
    store: req.verifiedUser.store,
  });
  //console.log( newProduct.category)
  try {
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    return res.status(201).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateProduct = async (req, res) => {
  const id = req.product._id;
  const host = process.env.HOST;
  const port = process.env.PORT;

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        // user: req.verifiedUser._id,
        image: `${host}:${port}/images/${req.file.filename}`,
        //  promotionPrice:req.body.promotionPrice,
        reference: req.body.reference,
        isPromotion: req.body.isPromotion,
        countInStock: req.body.countInStock,
        // store: req.verifiedUser.store,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updateProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getProduct = async (req, res) => {
  const productSlug = req.params.productSlug;
  try {
    const product = await Product.aggregate([
      { $match: { slug: productSlug } },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "reviews",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authors",
                pipeline: [
                  {
                    $lookup: {
                      from: "profiles",
                      localField: "profile",
                      foreignField: "_id",
                      as: "profiles",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ]).sort({ createdAt: -1 });
    await Product.populate(product, { path: "category", select: "title" });
    return res.status(200).json(product[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getProducts = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 999;

  let filter = {};
  if (req.query.category) {
    filter.category = await Category.findOne({
      slug: req.query.category,
    }).select("_id");
  }

  if (req.query.q) {
    filter.slug = { $regex: ".*" + req.query.q + ".*", $options: "i" };
  }
  if (req.verifiedUser === undefined || req.verifiedUser.role === "customer") {
    const storeId = req.store._id;

    console.log(storeId);
    const products = await Product.find({ store: storeId, ...filter })
      .limit(limit)
      // .populate("user")
      .populate("category")
      .sort({ createdAt: -1 });

    return res.status(200).json(products);
  }
  try {
    const products = await Product.find({
      store: req.verifiedUser.store,
      ...filter,
    })
      .limit(limit)
      // .populate("user")
      .populate("category")
      .sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.product._id;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    return res.status(200).json({ deleteProduct: deleteProduct });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;

module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;
module.exports.deleteProduct = deleteProduct;

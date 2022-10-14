const Category = require("../models/category.models");

const createCategory = async (req, res) => {
  const host = process.env.HOST;
  const port = process.env.PORT;
  const newCategory = new Category({
    title: req.body.title,
    // description: req.body.description,
    image: `${host}:${port}/images/${req.file.filename}`,
    store: req.verifiedUser.store,
  });

  try {
    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateCategory = async (req, res) => {
  const id = req.category._id;
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getCategory = async (req, res) => {
  const categorySlug = req.params.categorySlug;
  try {
    const category = await Category.findOne({ slug: categorySlug });
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getCategories = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 999;
  if (req.verifiedUser === undefined || req.verifiedUser.role === "customer") {
    const storeId = req.store._id;
    try {
      const categories = await Category.find({ store: storeId })
        .sort({ createdAt: -1 })
        .limit(limit);
      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    const getCategory = await Category.find({ store: req.verifiedUser.store })
      .sort({ createdAt: -1 })
      .limit(limit);
    return res.status(200).json(getCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 999;
    const getCategory = await Category.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    return res.status(200).json(getCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteCategory = async (req, res) => {
  const id = req.category._id;
  try {
    await Category.findByIdAndDelete(id);
    return res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createCategory = createCategory;
module.exports.getAllCategories = getAllCategories;

module.exports.updateCategory = updateCategory;
module.exports.getCategory = getCategory;
module.exports.getCategories = getCategories;
module.exports.deleteCategory = deleteCategory;

const Review = require("../models/productReview.models");

const addReview = async (req, res) => {
  const product = req.product._id;
  const currentUser = req.verifiedUser._id;

  const alreadyReviewed = await Review.findOne({
    $and: [{ product: product }, { author: currentUser }],
  });
  
  if (alreadyReviewed) {
    return res.status(401).json("Product already Reviewed");
  }

  try {
    const newReview = new Review({
      author: currentUser,
      rating: req.body.rating,
      product: product,
      comment: req.body.comment,
    });
    const savedReview = await newReview.save();
    return res.status(201).json(savedReview);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateReview = async (req, res) => {
  const id = req.review._id;
  try {
    const updateReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateReview);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.addReview = addReview;
module.exports.updateReview = updateReview;
